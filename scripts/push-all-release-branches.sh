#!/bin/bash -

# Push all `release-x-x` branches.

VERSIONS_DIR='./src/generated/versions'

# Latest (unversioned) docs
./scripts/extract-monorepo-version.sh

LATEST_VERSION_FULL=$(grep -Eo '"version": (.*?[^\\]")' $VERSIONS_DIR/latest/package.json)
LATEST_VERSION=($(echo $LATEST_VERSION_FULL | sed -E 's/"version": "([0-9]+\.[0-9]+).*/\1/'))

# All other documented versions, based on releases files
VERSION_FILES=$(ls ./src/content/releases)
EARLIEST_DOCS_VERSION=6.0

for VERSION_FILE in ${VERSION_FILES[@]}
do
  VERSION=${VERSION_FILE/.md/''}
  if awk "BEGIN {exit !($VERSION >= $EARLIEST_DOCS_VERSION)}"; then
    if awk "BEGIN {exit !($VERSION != $LATEST_VERSION)}"; then
      VERSION_BRANCH=($(echo $VERSION | sed -E 's/([0-9]+)\.([0-9]+)/release-\1-\2/'))
      git branch temp
      git push -f origin temp:$VERSION_BRANCH
      git branch -D temp
    fi
  fi
done
