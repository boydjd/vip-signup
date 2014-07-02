'use strict';

angular.module('signupApp')
  .directive('backButton', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        element.on('click', function () {
          history.back();
          scope.$apply();
        });
      }
    }
  });
