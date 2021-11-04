#!/bin/bash -

BUILD_DIR=public
TEMP_DIR=proxy-rewrites-are-fun

if [[ "$BRANCH" == "release-"* ]]; then
  VERSION=($(echo $BRANCH | sed -E 's/.*([0-9]+)-([0-9]+)/\1.\2/'))
  DIR="$BUILD_DIR/docs/$VERSION"

  echo "Moving built files to /$DIR/..."
  mkdir -p $TEMP_DIR
  
  mv $BUILD_DIR/* $TEMP_DIR
  
  mv "$TEMP_DIR/_headers" $BUILD_DIR
  mv "$TEMP_DIR/_redirects" $BUILD_DIR
  mv "$TEMP_DIR/404.html" $BUILD_DIR

  mkdir -p $DIR
  mv $TEMP_DIR/* $DIR
  rm -r $TEMP_DIR
fi
