'use strict';

/**
 * Attack.js controller
 *
 * @description: A set of functions called "actions" for managing `Attack`.
 */

module.exports = {

  /**
   * Retrieve attack records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.attack.search(ctx.query);
    } else {
      return strapi.services.attack.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a attack record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.attack.fetch(ctx.params);
  },

  /**
   * Count attack records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.attack.count(ctx.query);
  },

  /**
   * Create a/an attack record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.attack.add(ctx.request.body);
  },

  /**
   * Update a/an attack record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.attack.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an attack record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.attack.remove(ctx.params);
  }
};
