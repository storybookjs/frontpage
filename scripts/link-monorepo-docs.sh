#!/bin/bash -

# Link docs to a local checkout of the monorepo as specified by the first argument

MONOREPO_PATH="$1"
REPO_SUBDIR='docs'
REPO_DIRNAME='src/content/docs'
RELATIVE_DIRNAME='../..' # inverse of above

if [ "$MONOREPO_PATH" = "" ]; then
  echo "You need to provide a monorepo path as first argument: \`yarn link-monorepo-docs path/to/monorepo\`"
  exit 1;
fi



TARGET_DIR="$MONOREPO_PATH/$REPO_SUBDIR"

if [ -d "$TARGET_DIR" ]; then
  rm -rf "$REPO_DIRNAME"
  ln -s "$RELATIVE_DIRNAME/$TARGET_DIR" "$REPO_DIRNAME"
else 
  echo "Couldn't find monorepo docs at '$TARGET_DIR'"
  exit 1;
fi