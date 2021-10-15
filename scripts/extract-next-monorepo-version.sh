#!/bin/bash -

# Pull the version from the "next" monorepo branch

MONOREPO_CODELOAD_URL='https://codeload.github.com/storybookjs/storybook/tar.gz'

REPO_DIRNAME='src/content/docs'

NEXT_BRANCH="next"
NEXT_TAR_NAME="storybook-$NEXT_BRANCH"

set -e

curl $MONOREPO_CODELOAD_URL/$NEXT_BRANCH | tar -zxvC $REPO_DIRNAME "$NEXT_TAR_NAME/package.json" && mv "$REPO_DIRNAME/$NEXT_TAR_NAME/package.json" "$REPO_DIRNAME/next-package.json" && rm -r "$REPO_DIRNAME/$NEXT_TAR_NAME"
