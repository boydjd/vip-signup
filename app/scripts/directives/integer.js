'use strict';

angular.module('signupApp')
  .directive('integer', function () {
    return {
      require: 'ngModel',
      link: function postLink(scope, element, attrs, ctrl) {
        ctrl.$parsers.unshift(function(viewValue) {
          return parseInt(viewValue);
        });
      }
    };
  });
