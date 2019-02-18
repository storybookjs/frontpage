#!/bin/bash -

REPO='https://github.com/storybooks/storybook'
REPO_SUBDIR='docs'
BRANCH='next'
REPO_DIRNAME='monorepo'

set -e

rm -rf $FINAL_DIRNAME
rm -rf $REPO_DIRNAME
git clone --depth 1 --branch $BRANCH --no-checkout $REPO $REPO_DIRNAME
pushd $REPO_DIRNAME
git checkout $BRANCH -- $SUBDIR
pushd $REPO_SUBDIR
yarn
yarn build
popd
popd
cp -rf $REPO_DIRNAME/$REPO_SUBDIR/public public/docs