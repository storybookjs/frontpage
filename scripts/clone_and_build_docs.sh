
#!/bin/bash -

REPO='https://github.com/storybooks/storybook'
REPO_SUBDIR='docs/src/pages'
BRANCH='master'
NEXT_DIRNAME='docs/next'
MASTER_DIRNAME='docs/master'
TEMP_DIRNAME='docs/temp'

set -e

# download and copy 'master'
rm -rf $TEMP_DIRNAME
mkdir $TEMP_DIRNAME
rm -rf $MASTER_DIRNAME
mkdir $MASTER_DIRNAME
git clone --depth 1 --branch 'master' --no-checkout $REPO $TEMP_DIRNAME
pushd $TEMP_DIRNAME
git checkout 'master' -- $REPO_SUBDIR
popd
cp -rf $TEMP_DIRNAME/$REPO_SUBDIR/* $MASTER_DIRNAME

# download and copy 'next'
rm -rf $TEMP_DIRNAME
mkdir $TEMP_DIRNAME
rm -rf $NEXT_DIRNAME
mkdir $NEXT_DIRNAME
git clone --depth 1 --branch 'next' --no-checkout $REPO $TEMP_DIRNAME
pushd $TEMP_DIRNAME
git checkout 'next' -- $REPO_SUBDIR
popd
cp -rf $TEMP_DIRNAME/$REPO_SUBDIR/* $NEXT_DIRNAME

rm -rf $TEMP_DIRNAME
