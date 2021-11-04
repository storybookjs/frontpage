#!/bin/bash -

# Pull the monorepo docs from the branch specified as the first argument, or `main`.

MONOREPO_CODELOAD_URL='https://codeload.github.com/storybookjs/storybook/tar.gz'

SB_REPO_SUBDIR='docs/'
SB_REPO_DEPTH=2 # number of dirs + 1
REPO_DIRNAME='src/content/docs'

MAPPED_BRANCH=main
if  [[ "$BRANCH" == "release-"* ]]; then
  MAPPED_BRANCH=$BRANCH
fi
FINAL_BRANCH=${1:-$MAPPED_BRANCH}
BRANCH_TAR_NAME="storybook-$FINAL_BRANCH"

set -e

echo "Extracting docs from $FINAL_BRANCH branch..."

mkdir -p $REPO_DIRNAME
rm -rf $REPO_DIRNAME/*
curl $MONOREPO_CODELOAD_URL/$FINAL_BRANCH | tar -zxvC $REPO_DIRNAME --strip $SB_REPO_DEPTH $BRANCH_TAR_NAME/$SB_REPO_SUBDIR
