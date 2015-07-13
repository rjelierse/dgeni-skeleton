'use strict';

/**
 * @dgService gitData
 * @description
 * Provide information from the local git repository
 */
module.exports = function gitData () {
  return {
    version: {
      isSnapshot: true,
      raw: 'master'
    },
    info: {
      owner: 'foo',
      repo: 'bar'
    }
  }
}
