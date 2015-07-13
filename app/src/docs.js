angular.module('DocsController', [])

.controller('DocsController', [
    '$scope', '$rootScope', '$location', '$window', '$cookies', 'NG_PAGES', 'NG_NAVIGATION',
    function($scope, $rootScope, $location, $window, $cookies, NG_PAGES, NG_NAVIGATION) {

  $scope.openPlunkr = angular.noop();

  $scope.docsVersion = '2.0.13';
  $scope.toc = true;

  $scope.navClass = function(navItem) {
    return {
      active: navItem.href && this.currentPage.path,
      'nav-index-section': navItem.type === 'section'
    };
  };

  $scope.$watch(function docsPathWatch() {return $location.path(); }, function docsPathWatchAction(path) {

    path = path.replace(/^\/?(.+?)(\/index)?\/?$/, '$1');

    var currentPage = $scope.currentPage = NG_PAGES[path];

    if ( currentPage ) {
      $scope.partialPath = 'partials/' + path + '.html';
      $scope.currentArea = NG_NAVIGATION[currentPage.area];
      var pathParts = currentPage.path.split('/');
      var breadcrumb = $scope.breadcrumb = [];
      var breadcrumbPath = '';
      angular.forEach(pathParts, function(part) {
        breadcrumbPath += part;
        breadcrumb.push({ name: (NG_PAGES[breadcrumbPath]&&NG_PAGES[breadcrumbPath].name) || part, url: breadcrumbPath });
        breadcrumbPath += '/';
      });
    } else {
      $scope.currentArea = NG_NAVIGATION['home'];
      $scope.breadcrumb = [];
      $scope.partialPath = 'Error404.html';
    }
  });

  /**********************************
   Initialize
   ***********************************/

  $scope.versionNumber = angular.version.full;
  $scope.version = angular.version.full + "  " + angular.version.codeName;
  $scope.loading = 0;


  var INDEX_PATH = /^(\/|\/index[^\.]*.html)$/;
  if (!$location.path() || INDEX_PATH.test($location.path())) {
    $location.path('/home').replace();
  }

}]);
