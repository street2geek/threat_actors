'use strict';

/**
 * Attackpattern.js controller
 *
 * @description: A set of functions called "actions" for managing `Attackpattern`.
 */

module.exports = {

  /**
   * Retrieve attackpattern records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.attackpattern.search(ctx.query);
    } else {
      return strapi.services.attackpattern.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a attackpattern record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.attackpattern.fetch(ctx.params);
  },

  /**
   * Count attackpattern records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.attackpattern.count(ctx.query);
  },

  /**
   * Create a/an attackpattern record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.attackpattern.add(ctx.request.body);
  },

  /**
   * Update a/an attackpattern record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.attackpattern.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an attackpattern record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.attackpattern.remove(ctx.params);
  }
};
