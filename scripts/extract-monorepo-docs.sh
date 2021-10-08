#!/bin/bash -

# Pull the monorepo docs from the branch specified as the first argument, or `master`.

MONOREPO_CODELOAD_URL='https://codeload.github.com/storybookjs/storybook/tar.gz'

MAPPED_BRANCH=main
if [[ "$BRANCH" == "next" || "$BRANCH" == "release/"* ]]; then
  MAPPED_BRANCH=$BRANCH
fi
FINAL_BRANCH=${1:-$MAPPED_BRANCH}

TAR_NAME="storybook-$FINAL_BRANCH"
REPO_SUBDIR='docs/'
REPO_DEPTH=2 # number of dirs + 1
REPO_DIRNAME='src/content/docs'

set -e

mkdir -p $REPO_DIRNAME
rm -rf $REPO_DIRNAME/*
curl $MONOREPO_CODELOAD_URL/$FINAL_BRANCH | tar -zxvC $REPO_DIRNAME --strip $REPO_DEPTH $TAR_NAME/$REPO_SUBDIR
