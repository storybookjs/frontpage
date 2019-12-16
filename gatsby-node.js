const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      github {
        search(first: 1, type: REPOSITORY, query: "storybook") {
          edges {
            node {
              ... on GitHub_Repository {
                object(expression: "next:docs/src/pages") {
                  ... on GitHub_Tree {
                    entries {
                      name
                      type
                      object {
                        ... on GitHub_Tree {
                          entries {
                            name
                            type
                            object {
                              ... on GitHub_Tree {
                                entries {
                                  name
                                  type
                                  object {
                                    ... on GitHub_Blob {
                                      text
                                    }
                                  }
                                }
                              }
                              ... on GitHub_Blob {
                                text
                              }
                            }
                          }
                        }
                        ... on GitHub_Blob {
                          text
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `);

  if (result && result.data && result.data.github) {
    const {
      search: {
        edges: [
          {
            node: {
              object: { entries },
            },
          },
        ],
      },
    } = result.data.github;

    const addToFiles = (prefix = '/') => (acc, ref) => {
      const { name, type, object } = ref;
      const p = prefix + name;

      if (type === 'blob' && name.match(/.md$/) && !name.match(/404.md$/)) {
        // MUTATION
        acc[p.replace(/.md$/, '').replace(/\/index$/, '')] = object.text;
      } else if (type === 'tree') {
        // MUTATION
        object.entries.reduce(addToFiles(`${p}/`), acc);
      }

      return acc;
    };

    const files = entries.reduce(addToFiles('/docs/'), {});
    // console.log(JSON.stringify(files, null, 4));

    Object.entries(files).forEach(([k, v]) => {
      createPage({
        path: k,
        component: path.resolve(`./src/templates/documentation.js`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          markdown: v,
        },
      });
    });
  } else {
    console.log('NO ENTRIES from graphql');
  }
};
