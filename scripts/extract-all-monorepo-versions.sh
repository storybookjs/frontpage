#!/bin/bash -

# Pull (and rename) the package.json from all appropriate branches.

VERSIONS_DIR='./src/generated/versions'

rm -rf $VERSIONS_DIR/*

# Current docs
./scripts/extract-monorepo-version.sh $1 current

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
      ./scripts/extract-monorepo-version.sh $VERSION_BRANCH $VERSION
    fi
  fi
done
