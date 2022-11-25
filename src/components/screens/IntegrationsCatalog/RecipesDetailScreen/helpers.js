import newGithubIssueUrl from 'new-github-issue-url';

const REPO_URL = 'https://github.com/storybookjs/frontpage';

export const generateRecipeGithubIssueLink = (recipeName) =>
  newGithubIssueUrl({
    repoUrl: REPO_URL,
    title: `[${recipeName}]: `,
    body: `
## Details
**Recipe Page**: [${recipeName}](https://storybook.js.org/recipe/${recipeName})
**Recipe Template**: [${recipeName}](https://github.com/storybookjs/frontpage/blob/main/src/content/recipes/${recipeName}.md)
**Browser**: <!-- ENTER YOUR BROWSER AND VERSION HERE -->

## What is wrong
<!-- Below, briefly describe what is wrong with the recipe -->


## Screenshots
<!-- Add some screenshots to help demonstrate the issue -->



    `,
  });
