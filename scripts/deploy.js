var ghpages = require('gh-pages');
var path = require('path');

let defaultMessage = 'Deployment';

// To deploy with a custom commit message, run npm run deploy "Message"
if (process.argv[2] !== undefined) {
  defaultMessage = process.argv[2];
}

ghpages.publish('dist', {
  branch: 'master',
  dotfiles: true,
  message: defaultMessage,
});
