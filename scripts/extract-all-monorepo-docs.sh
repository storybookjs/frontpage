#!/bin/bash -

# Pull the monorepo docs from main, next, and all release branches.

LATEST_VERSION=6.3
NEXT_VERSION=6.4

# Latest (unversioned) docs
./scripts/extract-monorepo-docs.sh

# Next docs
NEXT_BRANCH=next

./scripts/extract-monorepo-docs.sh $NEXT_BRANCH /$NEXT_VERSION

# All other documented versions, based on releases files
VERSION_FILES=$(ls ./src/content/releases)
EARLIEST_DOCS_VERSION=6.0

for VERSION_FILE in ${VERSION_FILES[@]}
do
  VERSION=${VERSION_FILE/.md/''}
  if awk "BEGIN {exit !($VERSION >= $EARLIEST_DOCS_VERSION)}"; then
    if awk "BEGIN {exit !($VERSION < $LATEST_VERSION)}"; then
      BRANCH=($(echo $VERSION | sed -E 's/([0-9]+)\.([0-9]+)/release-\1-\2/'))
      ./scripts/extract-monorepo-docs.sh $BRANCH /$VERSION
    fi
  fi
done

exit 0