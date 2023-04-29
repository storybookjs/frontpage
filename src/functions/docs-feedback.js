/* eslint-disable no-console, import/no-extraneous-dependencies */
import dedent from 'dedent';
import fetch from 'node-fetch';

const pat = process.env.GITHUB_STORYBOOK_BOT_PAT;

if (!pat) {
  throw new Error('GITHUB_STORYBOOK_BOT_PAT not found in environment');
}

const repositoryOwner = 'storybookjs';
const repositoryName = 'storybook';
const repositoryId = 'MDEwOlJlcG9zaXRvcnk1NDE3MzU5Mw==';
// Corresponds to "Documentation feedback" category
const categoryId = 'DIC_kwDOAzqfmc4CWGpo';

function createTitle(path) {
  return `Feedback for ${path} docs page`;
}

function createRating(upOrDown, value) {
  return `<!--start-${upOrDown}-->${value}<!--end-${upOrDown}-->`;
}

const ratingSymbols = {
  up: '👍',
  down: '👎',
};

function createBody({ isFirst, path, version, framework, codeLanguage, rating, comment }) {
  const link = `**[${path}](https://storybook.js.org${path})**`;

  // prettier-ignore
  const meta = [
    `| ${ratingSymbols[rating]} | v${version} | ${framework} | ${codeLanguage} |`,
    '| - | - | - | - |',
  ].join('\r\n');

  let cumulativeRating;
  if (isFirst) {
    cumulativeRating = [
      `| ${ratingSymbols['up']} | ${ratingSymbols['down']} |`,
      '| :-: | :-: |',
      // prettier-ignore
      `| ${createRating('up', rating === 'up' ? 1 : 0)} | ${createRating('down', rating === 'down' ? 1 : 0)} |`,
    ].join('\r\n');
  }

  return [link, meta, comment, cumulativeRating].filter((block) => Boolean(block)).join('\r\n\r\n');
}

function updateRating(body, rating) {
  const regex = new RegExp(createRating(rating, '(\\d+)'));
  const currentRating = body.match(regex)[1];
  return body.replace(regex, createRating(rating, parseInt(currentRating, 10) + 1));
}

export async function queryGitHub(query, { variables = {} } = {}) {
  let response;
  try {
    response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(pat && {
          Authorization: `bearer ${pat}`,
          'User-Agent': 'storybook-bot',
        }),
      },
      body: JSON.stringify({ query, variables }),
    });

    if (response) {
      const { data, errors } = await response.json();
      if (!errors || errors.length === 0) {
        return data;
      }
      throw new Error(errors.map((error) => error.message).join('\n'));
    }
    throw new Error('No response');
  } catch (error) {
    throw new Error(
      [
        'Failed to fetch GitHub query',
        `Response: ${JSON.stringify(response, null, 2)}`,
        `Error: ${JSON.stringify(error, null, 2)}`,
        `Query: {${query}`,
        `variables: ${JSON.stringify(variables, null, 2)}`,
      ].join('\n')
    );
  }
}

async function getDiscussion(title) {
  console.info('Fetching discussions...');
  let discussions = [];
  let after;
  do {
    const {
      repository: {
        discussions: {
          nodes: newDiscussions,
          pageInfo: { hasNextPage, endCursor },
        },
      },
      // eslint-disable-next-line no-await-in-loop
    } = await queryGitHub(
      dedent(`
      query GetDiscussions($owner: String!, $name: String!, $after: String, $categoryId: ID!) {
        repository(owner: $owner, name: $name) {
          discussions(first: 100, after: $after, categoryId: $categoryId) {
            nodes {
              title
              id
              number
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      }
    `),
      {
        variables: {
          owner: repositoryOwner,
          name: repositoryName,
          after,
          categoryId,
        },
      }
    );

    discussions = discussions.concat(newDiscussions);

    after = hasNextPage ? endCursor : undefined;
  } while (after);
  console.info('... done!');

  return discussions.find((discussion) => discussion.title === title);
}

async function updateDiscussion({ number, id, rating }) {
  const {
    repository: {
      discussion: { body: currentBody },
    },
  } = await queryGitHub(
    dedent(`
      query GetDiscussion($owner: String!, $name: String!, $number: Int!) {
        repository(owner: $owner, name: $name) {
          discussion(number: $number) {
            body
          }
        }
      }
    `),
    {
      variables: {
        owner: repositoryOwner,
        name: repositoryName,
        number,
      },
    }
  );

  console.info('Updating discussion with new rating...');
  const {
    updateDiscussion: {
      discussion: { body: updatedBody },
    },
  } = await queryGitHub(
    dedent(`
      mutation UpdateDiscussion($discussionId: ID!, $body: String!) { 
        updateDiscussion(input: {
          discussionId: $discussionId,
          body: $body,
        }) {
          discussion {
            body
          }
        }
      }
    `),
    {
      variables: {
        discussionId: id,
        body: updateRating(currentBody, rating),
      },
    }
  );
  console.info('... done!', 'Updated body:\n', updatedBody);
}

async function addDiscussionComment({ id, received, rating, comment }) {
  console.info('Adding comment to discussion...');
  const {
    addDiscussionComment: {
      comment: { body: addedComment, url },
    },
  } = await queryGitHub(
    dedent(`
      mutation AddDiscussionComment($discussionId: ID!, $body: String!) {
        addDiscussionComment(input: {
          discussionId: $discussionId,
          body: $body,
        }) {
          comment {
            body
            url
          }
        }
      }
    `),
    {
      variables: {
        discussionId: id,
        body: createBody({ ...received, rating, comment }),
      },
    }
  );
  console.info('... done!, Added comment:', '\n', url, '\n', addedComment);
  return url;
}

async function createDiscussion({ received, path, rating, comment, title }) {
  console.info(`Creating new discussion for ${path}...`);
  const {
    createDiscussion: {
      discussion: { title: addedTitle, body: addedBody, url },
    },
  } = await queryGitHub(
    dedent(`
      mutation CreateDiscussion($repositoryId: ID!, $categoryId: ID!, $title: String!, $body: String!) { 
        createDiscussion(input: {
          repositoryId: $repositoryId,
          categoryId: $categoryId,
          title: $title,
          body: $body
        }) {
          discussion {
            title
            body
            url
          }
        }
      }
    `),
    {
      variables: {
        repositoryId,
        categoryId,
        title,
        body: createBody({ isFirst: true, ...received, rating, comment }),
      },
    }
  );
  console.info('... done!, Added discussion:', '\n', url, '\n', addedTitle, '\n', addedBody);

  return url;
}

exports.handler = async (event) => {
  try {
    const { body } = event;
    const received = JSON.parse(body);
    console.info('Received:', JSON.stringify(received, null, 2));
    const { rating, comment } = received;

    // TODO: This could contain a version?
    const path = `/${received.path.split('/').slice(-2).join('/')}`;

    const title = createTitle(path);

    let url;

    const currentDiscussion = await getDiscussion(title);

    if (currentDiscussion) {
      console.info(`Found discussion for ${path}`);
      await updateDiscussion({ ...currentDiscussion, rating });

      if (comment) {
        url = await addDiscussionComment({ ...currentDiscussion, received, rating, comment });
      }
    } else {
      url = await createDiscussion({ received, path, rating, comment, title });
    }
    // TODO: Return the new discussion/comment URL
    return {
      statusCode: 200,
      body: JSON.stringify({ url }),
    };
  } catch (error) {
    console.info(error.toString());
    return {
      statusCode: 500,
      body: error.toString(),
    };
  }
};
