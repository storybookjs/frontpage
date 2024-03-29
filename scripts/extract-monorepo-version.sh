#!/bin/bash -

# Pull (and rename) the package.json from the branch specified as the first argument, or `main`.

MONOREPO_CODELOAD_URL='https://codeload.github.com/storybookjs/storybook/tar.gz'

VERSIONS_DIR='./src/generated/versions'

BRANCH_ARG=${1:-main}
LABEL=${2:-$BRANCH_ARG}
if [[ $BRANCH_ARG == 'main' ]]; then
  LABEL=${2:-latest}
fi
TAR_NAME="storybook-$BRANCH_ARG"

echo "Extracting $LABEL version info..."

mkdir -p "$VERSIONS_DIR/$LABEL"

curl $MONOREPO_CODELOAD_URL/$BRANCH_ARG | tar -zxvC $VERSIONS_DIR "$TAR_NAME/docs/toc.js" "$TAR_NAME/package.json" "$TAR_NAME/code/package.json"

set -e

# Path to the versioned package.json
PACKAGE_JSON_PATH="package.json"

# If a code/package.json exists
if [[ -f "$VERSIONS_DIR/$TAR_NAME/code/package.json" ]]; then
  PACKAGE_JSON_PATH="code/package.json"
fi

mv "$VERSIONS_DIR/$TAR_NAME/$PACKAGE_JSON_PATH" "$VERSIONS_DIR/$LABEL/package.json"
mv "$VERSIONS_DIR/$TAR_NAME/docs/toc.js" "$VERSIONS_DIR/$LABEL/toc.js"
rm -r "$VERSIONS_DIR/$TAR_NAME"
