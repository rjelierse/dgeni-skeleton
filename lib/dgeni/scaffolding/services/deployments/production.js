'use strict';

var cdnUrl = '//ajax.googleapis.com/ajax/libs/angularjs/1.4.1';

module.exports = function productionDeployment() {
  return {
    name: 'default',
    examples: {
      commonFiles: {
        scripts: [ cdnUrl + '/angular.min.js' ]
      },
      dependencyPath: cdnUrl + '/'
    },
    scripts: [
      cdnUrl + '/angular.min.js',
      cdnUrl + '/angular-resource.min.js',
      cdnUrl + '/angular-route.min.js',
      cdnUrl + '/angular-cookies.min.js',
      cdnUrl + '/angular-sanitize.min.js',
      cdnUrl + '/angular-touch.min.js',
      cdnUrl + '/angular-animate.min.js',
      'components/marked/marked.min.js',
      'js/angular-bootstrap/bootstrap.min.js',
      'js/angular-bootstrap/dropdown-toggle.min.js',
      'components/lunr.js/lunr.min.js',
      'components/google-code-prettify/bin/prettify.min.js',
      'components/google-code-prettify/bin/prettify.min.css',
      'js/pages-data.js',
      'js/nav-data.js',
      'js/docs.min.js'
    ],
    stylesheets: [
      'css/prettify-theme.css',
      'css/docs.css',
      'css/animations.css'
    ]
  };
};
