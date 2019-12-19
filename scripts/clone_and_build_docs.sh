#!/bin/bash -

REPO='https://github.com/storybooks/storybook'
DOCS_DIRNAME='docs/src/pages'
ADDONS_DIRNAME='addons'
TEMP_DIRNAME='docs/temp'

DOCS_NEXT_DIRNAME='docs/next'
DOCS_MASTER_DIRNAME='docs/master'

ADDONS_DIRNAME='docs/addons'

MAINTENANCE_DIRNAME='docs/maintenance'
GIF_DIRNAME='static/gifs'

set -e

echo ""
echo "1) download and copy 'master'"
echo ""
rm -rf $TEMP_DIRNAME
mkdir $TEMP_DIRNAME
git clone --depth 1 --branch 'master' --no-checkout $REPO $TEMP_DIRNAME
pushd $TEMP_DIRNAME
git checkout 'master' -- $DOCS_DIRNAME
popd

echo ""
echo "1.1) pages"
echo ""
rm -rf $DOCS_MASTER_DIRNAME
mkdir $DOCS_MASTER_DIRNAME
cp -rfv $TEMP_DIRNAME/$DOCS_DIRNAME/* $DOCS_MASTER_DIRNAME

echo ""
echo "1.2) gifs"
echo ""
rm -rf $GIF_DIRNAME
mkdir $GIF_DIRNAME
find $TEMP_DIRNAME/$DOCS_DIRNAME -name '*.gif' -exec cp -prv '{}' $GIF_DIRNAME ';'

echo ""
echo "2) download and copy 'next'"
echo ""
rm -rf $TEMP_DIRNAME
mkdir $TEMP_DIRNAME
git clone --depth 1 --branch 'next' --no-checkout $REPO $TEMP_DIRNAME
pushd $TEMP_DIRNAME
git checkout 'next'
popd

echo ""
echo "2.1) pages"
echo ""
rm -rf $DOCS_NEXT_DIRNAME
mkdir $DOCS_NEXT_DIRNAME
cp -rfv $TEMP_DIRNAME/$DOCS_DIRNAME/* $DOCS_NEXT_DIRNAME

echo ""
echo "2.2) gifs"
echo ""
find $TEMP_DIRNAME/$DOCS_DIRNAME -name '*.gif' -exec cp -prv '{}' $GIF_DIRNAME ';'

echo ""
echo "2.2) addons README"
echo ""
rm -rf $ADDONS_DIRNAME
mkdir $ADDONS_DIRNAME
find $TEMP_DIRNAME/addons -name 'README.md' | while read line; do
  name=`echo $line | cut -d'/' -f4`
  cp -rfv $line $ADDONS_DIRNAME/$name.md
done

echo ""
echo "2.3 MIGRATION, RELEASE, ADDONS_SUPPORT, CHANGELOG, CONTRIBUTING"
echo ""
cp -rfv $TEMP_DIRNAME/*.md $MAINTENANCE_DIRNAME

echo ""
echo "3) CLEANUP"
rm -rf $TEMP_DIRNAME
