"use strict";

module.exports = function defaultDeployment() {
  return {
    name: 'default',
    examples: {
      commonFiles: {
        scripts: [ '../../../angular.min.js' ]
      },
      dependencyPath: '../../../'
    },
    scripts: [
      'js/angular.min.js',
      'js/angular-resource.min.js',
      'js/angular-route.min.js',
      'js/angular-cookies.min.js',
      'js/angular-sanitize.min.js',
      'js/angular-touch.min.js',
      'js/angular-animate.min.js',
      'components/marked/lib/marked.js',
      'js/angular-bootstrap/bootstrap.min.js',
      'js/angular-bootstrap/dropdown-toggle.min.js',
      'components/lunr.js/lunr.min.js',
      'components/google-code-prettify/src/prettify.js',
      'components/google-code-prettify/src/lang-css.js',
      'js/pages-data.js',
      'js/nav-data.js',
      'js/docs.min.js'
    ],
    stylesheets: [
      'components/bootstrap/css/bootstrap.min.css',
      'components/open-sans-fontface/open-sans.css',
      'css/prettify-theme.css',
      'css/docs.css',
      'css/animations.css'
    ]
  };
};