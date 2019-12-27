/**
 *
 * Error wrapper for handler error
 * when promise is rejected
 *
 * @param {function} fn
 */

async function errorWrapper(fn) {
  try {
    const result = await fn();
    return result;
  } catch (err) {
    return err;
  }
}

/**
 *
 * This function is a helper,
 * to execute queries that expect more than one result
 * through the pg-promose query.
 *
 * @param {object} DB
 * @param {string} query
 * @param {Array} params
 */
async function dbQuery(DB, query, params) {
  const queryWrapper = () => DB.query(query, params);
  const result = await errorWrapper(queryWrapper);
  return result;
}

/**
 *
 * This function is a helper,
 * to execute queries that expect 1 result
 * through the pg-promose query.
 *
 * @param {object} DB
 * @param {string} query
 * @param {Array} params
 */

async function dbOneQuery(DB, query, param) {
  const queryWrapper = () => DB.one(query, param);
  const result = await errorWrapper(queryWrapper);
  return result;
}

module.exports = {
  dbQuery,
  dbOneQuery
};
