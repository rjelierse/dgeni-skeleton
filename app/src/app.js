angular.module('docsApp', [
  'ngRoute',
  'ngCookies',
  'ngSanitize',
  'ngAnimate',
  'DocsController',
  'pagesData',
  'navData',
  'directives',
  'search',
  'components',
  'bootstrap',
  'ui.bootstrap.dropdown'
])
  .config(['$locationProvider', function ($locationProvider) {
    'use strict';

    $locationProvider
      .html5Mode(true)
      .hashPrefix('!')
  }])