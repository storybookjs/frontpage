#!/bin/bash -

# Pull the monorepo docs from main, next, and all release branches.

VERSION_PROPERTY_REGEX='"version":(.*?[^\\]")'
SHORT_VERSION_REGEX='s/"version":"([0-9]+\.[0-9]+).*/\1/'
REPO_DOCS_DIR='./src/content/docs'
NEXT_BRANCH=next
VERSION_FILES_DIR=$(ls ./src/content/releases)
EARLIEST_DOCS_VERSION=6.0

# Latest (unversioned) docs
echo 'Extracting "latest" docs...'
./scripts/extract-monorepo-docs.sh

LATEST_VERSION_FULL=$(grep -Eo $VERSION_PROPERTY_REGEX $REPO_DOCS_DIR/versions/latest.json)
LATEST_VERSION=($(echo $LATEST_VERSION_FULL | sed -E $SHORT_VERSION_REGEX))


# Next docs

# Aside from the files extraction, all of works around the seemingly inaccurate
# contents of $REPO_DOCS_DIR/versions/next.json

# 1. Extract into NEXT_BRANCH, so we have a reliable location to retrieve NEXT_VERSION_FULL
echo 'Extracting "next" docs...'
./scripts/extract-monorepo-docs.sh $NEXT_BRANCH /$NEXT_BRANCH

# 2. Find NEXT_VERSION, much like we did LATEST_VERSION
NEXT_VERSION_FULL=$(grep -Eo $VERSION_PROPERTY_REGEX $REPO_DOCS_DIR/next/versions/next.json)
NEXT_VERSION=($(echo $NEXT_VERSION_FULL | sed -E $SHORT_VERSION_REGEX))

# 3. Move it to the proper version number directory
echo "Moving \"next\" docs into \"$NEXT_VERSION\" dir..."
mv $REPO_DOCS_DIR/next $REPO_DOCS_DIR/$NEXT_VERSION
# 4. Back up original "latest" versions/next.json
mv $REPO_DOCS_DIR/versions/next.json $REPO_DOCS_DIR/versions/next-bak.json
# 5. Overwrite "latest" versions/next.json with copy from "next"
echo 'Extracting "next" version...'
cp $REPO_DOCS_DIR/$NEXT_VERSION/versions/next.json $REPO_DOCS_DIR/versions/next.json


# All other documented versions, based on releases files
for VERSION_FILE in ${VERSION_FILES_DIR[@]}
do
  VERSION=${VERSION_FILE/.md/''}
  if awk "BEGIN {exit !($VERSION >= $EARLIEST_DOCS_VERSION)}"; then
    if awk "BEGIN {exit !($VERSION < $LATEST_VERSION)}"; then
      BRANCH=($(echo $VERSION | sed -E 's/([0-9]+)\.([0-9]+)/release-\1-\2/'))
      echo "Extracting \"$BRANCH\" docs into \"$VERSION\" dir..."
      ./scripts/extract-monorepo-docs.sh $BRANCH /$VERSION
    fi
  fi
done

exit 0