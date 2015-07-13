'use strict';

var path = require('canonical-path');
var sdkLocation = path.resolve(__dirname, 'path/to/project/source');

module.exports = {
  dest: 'build',
  src: [
    sdkLocation + '/**/*.js',
    'content/**'
  ]
};
