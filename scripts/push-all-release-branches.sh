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

set +e

for VERSION_FILE in ${VERSION_FILES[@]}
do
  VERSION=${VERSION_FILE/.md/''}
  if awk "BEGIN {exit !($VERSION >= $EARLIEST_DOCS_VERSION)}"; then
    if awk "BEGIN {exit !($VERSION != $LATEST_VERSION)}"; then
      VERSION_BRANCH=($(echo $VERSION | sed -E 's/([0-9]+)\.([0-9]+)/release-\1-\2/'))
      REMOTE_BRANCH=$(git branch -r | grep origin/$VERSION_BRANCH)
      if [[ ! -z $REMOTE_BRANCH ]]; then git push origin --delete $VERSION_BRANCH; fi
      echo "Pushing branch $VERSION_BRANCH..."
      git push -f origin HEAD:$VERSION_BRANCH
    fi
  fi
done
