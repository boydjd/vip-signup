'use strict';

angular.module('signupApp')
  .directive('validatePin', ['$http', '$timeout', 'Account', 'SignupService', 'API_ENDPOINT', function ($http, $timeout, Account, SignupService, API_ENDPOINT) {
  return {
    require: 'ngModel',
    scope: {
      ngModel: '=',
      callSid: '@callSid',
    },
    link: function postLink(scope, element, attrs, ngModelCtrl) {
      function setAsLoading(bool) {
        ngModelCtrl.$setValidity('checkingPIN', !bool);
      }

      function checkPIN(value) {
        if (value !== '' && typeof value !== "undefined" && !SignupService.activation) {
          $http.get(
            API_ENDPOINT + 'activate/validatePIN',
            {
              params: {
                pin: value,
                callSid: scope.callSid,
                accountNumber: Account.accountId 
              }
            }
            )
            .success(function(data, status, headers, config) {
                ngModelCtrl.$setValidity('validPIN', true);
                SignupService.activation = true;
            })
            .error(function(data, status, headers, config) {
              ngModelCtrl.$setValidity('validPIN', false);
            });
        } else {
          ngModelCtrl.$setValidity('validPIN', false);
        }

        setAsLoading(false);

        return value;
      }

      ngModelCtrl.$parsers.push(checkPIN);
      ngModelCtrl.$formatters.push(checkPIN);

      scope.$watch(attrs.validatePin, function () {
        ngModelCtrl.$setViewValue(ngModelCtrl.$viewValue);
      });
    }
  }
}]);
