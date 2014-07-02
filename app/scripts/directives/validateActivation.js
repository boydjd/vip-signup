'use strict';

// @todo Wire up to backend webservice to validate activation PIN
angular.module('signupApp')
.directive('validateActivation', ['$http', '$timeout', function ($http, $timeout) {
  return {
    require: 'ngModel',
    link: function postLink(scope, element, attrs, ngModelCtrl) {
      function validateActivation(value) {
        ngModelCtrl.$setValidity('validPIN', true);

        if (ngModelCtrl.$valid) {
          ngModelCtrl.$setValidity('checkingPIN', false);

          if (value !== '' && typeof value !== 'undefined') {
            // @todo Change to correct URL
            $http.get('Invalid.json')
            .success(function(data, status, headers, config) {
              ngModelCtrl.$setValidity('validPIN', true);
              ngModelCtrl.$setValidity('checkingPIN', true);
            })
            .error(function(data, status, headers, config) {
              ngModelCtrl.$setValidity('validPIN', false);
              ngModelCtrl.$setValidity('checkingPIN', true);
            });
          } else {
            ngModelCtrl.$setValidity('validPIN', false);
            ngModelCtrl.$setValidity('checkingPIN', true);
          }

          return value;
        }
      }

      ngModelCtrl.$parsers.push(validateActivation);
      ngModelCtrl.$formatters.push(validateActivation);

      scope.$watch(attrs.validateActivation, function () {
        ngModelCtrl.$setViewValue(ngModelCtrl.$viewValue);
      });
    }
  };
}]);
