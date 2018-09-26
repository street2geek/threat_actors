'use strict';

/**
 * Attackpattern.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');

module.exports = {

  /**
   * Promise to fetch all attackpatterns.
   *
   * @return {Promise}
   */

  fetchAll: (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('attackpattern', params);
    // Select field to populate.
    const populate = Attackpattern.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Attackpattern
      .find()
      .where(filters.where)
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
  },

  /**
   * Promise to fetch a/an attackpattern.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    // Select field to populate.
    const populate = Attackpattern.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Attackpattern
      .findOne(_.pick(params, _.keys(Attackpattern.schema.paths)))
      .populate(populate);
  },

  /**
   * Promise to count attackpatterns.
   *
   * @return {Promise}
   */

  count: (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('attackpattern', params);

    return Attackpattern
      .count()
      .where(filters.where);
  },

  /**
   * Promise to add a/an attackpattern.
   *
   * @return {Promise}
   */

  add: async (values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Attackpattern.associations.map(ast => ast.alias));
    const data = _.omit(values, Attackpattern.associations.map(ast => ast.alias));

    // Create entry with no-relational data.
    const entry = await Attackpattern.create(data);

    // Create relational data and return the entry.
    return Attackpattern.updateRelations({ _id: entry.id, values: relations });
  },

  /**
   * Promise to edit a/an attackpattern.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Attackpattern.associations.map(a => a.alias));
    const data = _.omit(values, Attackpattern.associations.map(a => a.alias));

    // Update entry with no-relational data.
    const entry = await Attackpattern.update(params, data, { multi: true });

    // Update relational data and return the entry.
    return Attackpattern.updateRelations(Object.assign(params, { values: relations }));
  },

  /**
   * Promise to remove a/an attackpattern.
   *
   * @return {Promise}
   */

  remove: async params => {
    // Select field to populate.
    const populate = Attackpattern.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Attackpattern
      .findOneAndRemove(params, {})
      .populate(populate);

    if (!data) {
      return data;
    }

    await Promise.all(
      Attackpattern.associations.map(async association => {
        const search = _.endsWith(association.nature, 'One') || association.nature === 'oneToMany' ? { [association.via]: data._id } : { [association.via]: { $in: [data._id] } };
        const update = _.endsWith(association.nature, 'One') || association.nature === 'oneToMany' ? { [association.via]: null } : { $pull: { [association.via]: data._id } };

        // Retrieve model.
        const model = association.plugin ?
          strapi.plugins[association.plugin].models[association.model || association.collection] :
          strapi.models[association.model || association.collection];

        return model.update(search, update, { multi: true });
      })
    );

    return data;
  },

  /**
   * Promise to search a/an attackpattern.
   *
   * @return {Promise}
   */

  search: async (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('attackpattern', params);
    // Select field to populate.
    const populate = Attackpattern.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    const $or = Object.keys(Attackpattern.attributes).reduce((acc, curr) => {
      switch (Attackpattern.attributes[curr].type) {
        case 'integer':
        case 'float':
        case 'decimal':
          if (!_.isNaN(_.toNumber(params._q))) {
            return acc.concat({ [curr]: params._q });
          }

          return acc;
        case 'string':
        case 'text':
        case 'password':
          return acc.concat({ [curr]: { $regex: params._q, $options: 'i' } });
        case 'boolean':
          if (params._q === 'true' || params._q === 'false') {
            return acc.concat({ [curr]: params._q === 'true' });
          }

          return acc;
        default:
          return acc;
      }
    }, []);

    return Attackpattern
      .find({ $or })
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
  }
};
