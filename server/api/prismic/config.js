module.exports = {

  apiEndpoint: 'https://alyx.cdn.prismic.io/api',

  // -- Access token if the Master is not open
  accessToken: 'MC5XVFhtV2lrQUFPUWdhbUZ1.77-9Ie-_ve-_ve-_ve-_vQ7vv71u77-9Ru-_vQsUAO-_ve-_vUwLVV1u77-9DjQ8QC5M77-9WO-_vQ',

  // OAuth
  clientId: 'WTXmRCkAACUhamEK',
  clientSecret: '78bebb742c6627a4c4bb1c9dbadb6d5e',

  // -- Links resolution rules
  // This function will be used to generate links to Prismic.io documents
  // As your project grows, you should update this function according to your routes
  linkResolver: function(doc, ctx) {
    return '/';
  }
};
