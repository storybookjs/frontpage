// eslint-disable-next-line
const remark = require('remark');
const remarkHTML = require('remark-html');
const absoluteLinks = require('../absolute-links');

const DELAY = 3000;
/**
 * @param {int} delay Time in milliseconds
 * @returns A promise that will resolve in given milliseconds
 */
const wait = (delay = DELAY) => new Promise((resolve) => setTimeout(resolve, delay));

function validateResponse(predicate) {
  return (response) => {
    if (response.error) {
      throw new Error(response.error.errorMessage || response.errors[0].message);
    }

    if (predicate && !predicate(response.data)) {
      throw new Error(`Data not found for ${predicate.toString()}`);
    }

    return response;
  };
}

function createMarkdownProcessor(absoluteLinkBase) {
  const processor = remark();

  if (absoluteLinkBase) {
    processor.use(absoluteLinks, {
      base: absoluteLinkBase,
    });
  }

  return processor.use(remarkHTML);
}

module.exports = {
  wait,
  validateResponse,
  createMarkdownProcessor,
};
