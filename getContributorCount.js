const fs = require('fs');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

const PACKAGE = require('./package');

const repoURL = 'https://github.com/storybooks/storybook';

const getContributorCount = async () => {
  await fetch(repoURL)
    .then(res => res.text())
    .then(body => {
      const $ = cheerio.load(body);
      const count = $('a[href="/storybooks/storybook/graphs/contributors"] > span').html().trim();
      fs.writeFile('package.json', JSON.stringify({...PACKAGE, config: { contributorCount: count }}, null, 2), (err) => {
        if(err) {
            return console.log(err);
        }
        console.log(`New contributor count added to package.json: ${count} contributors!`);
     }); 
    });
};

getContributorCount();