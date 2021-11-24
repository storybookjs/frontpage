const { version: versionFull } = require('../generated/versions/current/package.json');
const { version: latestVersionFull } = require('../generated/versions/latest/package.json');

const VERSION_PARTS_REGEX = /^(\d+\.\d+)(?:\.\d+)?-?(\w+)?(?:\.\d+$)?/;
const [, versionString] = versionFull.match(VERSION_PARTS_REGEX);
const version = parseFloat(versionString);
const [, latestVersionString] = latestVersionFull.match(VERSION_PARTS_REGEX);
const latestVersion = parseFloat(latestVersionString);

module.exports = {
  version,
  versionString,
  latestVersion,
  latestVersionString,
  isLatest: version === latestVersion,
};
