#!/bin/bash -

MONOREPO_CODELOAD_URL='https://codeload.github.com/storybookjs/storybook/tar.gz'
BRANCH=${1:-6.0-docs}
TAR_NAME="storybook-$BRANCH"
REPO_SUBDIR='docs/src/pages'
REPO_DEPTH=4 # number of dirs + 1
REPO_DIRNAME='src/content'

set -e

mkdir -p $REPO_DIRNAME
rm -rf $REPO_DIRNAME/*
curl $MONOREPO_CODELOAD_URL/$BRANCH | tar -zxvC $REPO_DIRNAME --strip $REPO_DEPTH $TAR_NAME/$REPO_SUBDIR
