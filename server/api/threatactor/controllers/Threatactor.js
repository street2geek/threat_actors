'use strict';

/**
 * Threatactor.js controller
 *
 * @description: A set of functions called "actions" for managing `Threatactor`.
 */

module.exports = {

  /**
   * Retrieve threatactor records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.threatactor.search(ctx.query);
    } else {
      return strapi.services.threatactor.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a threatactor record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.threatactor.fetch(ctx.params);
  },

  /**
   * Count threatactor records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.threatactor.count(ctx.query);
  },

  /**
   * Create a/an threatactor record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.threatactor.add(ctx.request.body);
  },

  /**
   * Update a/an threatactor record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.threatactor.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an threatactor record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.threatactor.remove(ctx.params);
  }
};
