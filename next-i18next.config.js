const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'sv-SE',
    locales: ['en-US', 'sv-SE'],
    localeDetection: false,
    localePath: path.resolve('./public/locales'),
  },
};
