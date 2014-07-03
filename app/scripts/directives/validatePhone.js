'use strict';

angular.module('signupApp')
.directive('validatePhone', ['$http', '$timeout', 'API_ENDPOINT', function ($http, $timeout, API_ENDPOINT) {
  return {
    require: 'ngModel',
    scope: {
      country: '@country'
    },
    link: function postLink(scope, element, attrs, ngModelCtrl) {
      function setAsLoading(bool) {
        ngModelCtrl.$setValidity('checkingPhone', !bool);
      }

      function validatePhone(value) {
        setAsLoading(true);

        if (value !== '' && typeof value !== 'undefined') {
          $http.get(
            API_ENDPOINT + '/rest/v1/validate/phoneNumber',
            {
                params: {
                  phoneNumber: value,
                  country: scope.country
                }
            }
          )
          .success(function(data, status, headers, config) {
            if (data.resultSet.valid === false) {
              ngModelCtrl.$setValidity('validPhoneNumber', false);
              setAsLoading(false);
            } else {
              ngModelCtrl.$setValidity('validPhoneNumber', true);
              setAsLoading(false);
            }
          })
          .error(function(data, status, headers, config) {
            ngModelCtrl.$setValidity('validPhoneNumber', false);
            setAsLoading(false);
          });
        }

        return value;
      }

      ngModelCtrl.$parsers.push(validatePhone);
      ngModelCtrl.$formatters.push(validatePhone);

      scope.$watch(attrs.validatePhone, function () {
        ngModelCtrl.$setViewValue(ngModelCtrl.$viewValue);
      });
    }
  };
}]);
