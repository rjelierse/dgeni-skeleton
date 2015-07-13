angular.module('components', [])
.directive('breadcrumb', function () {
    'use strict';

    return {
      link: postLink,
      replace: true,
      restrict: 'E',
      scope: {
        crumbs: '='
      },
      template: '<ol class="breadcrumb"><li><a ng-href="{{ home }}" class="text-primary"><span class="glyphicon glyphicon-home"></span></a></li><li ng-repeat="crumb in crumbs" ng-class="{active: $last}"><a ng-if="!$last" ng-href="{{ crumb.url }}">{{ crumb.name }}</a><span ng-if="$last">{{ crumb.name }}</span></li></ol>'
    }

    function postLink ($scope, $element, $attr) {
      $scope.home = $attr.rootHref
    }
  })