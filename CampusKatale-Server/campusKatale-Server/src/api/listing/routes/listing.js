'use strict';

/**
 * listing router with Clerk middleware on POST route
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::listing.listing', {
  config: {
    create: {
      middlewares: ['global::clerk-auth'],
    },
  },
});
