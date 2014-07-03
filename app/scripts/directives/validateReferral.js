'use strict';

angular.module('signupApp')
.directive('validateReferral', ['$http', '$timeout', 'SignupService', 'API_ENDPOINT', function ($http, $timeout, SignupService, API_ENDPOINT) {
  return {
    require: 'ngModel',
    link: function postLink(scope, element, attrs, ngModelCtrl) {
      function validateReferral(value) {
        ngModelCtrl.$setValidity('validReferral', true);

        if (typeof value === 'undefined' || !value.length) {
          SignupService.payment.referralDesc = '';
          ngModelCtrl.$setPristine();
          return '';
        }

        if (ngModelCtrl.$valid) {
          ngModelCtrl.$setValidity('checkingReferral', false);

          if (value !== '' && typeof value !== 'undefined') {
            $http.get(
              API_ENDPOINT + '/rest/v1/validate/referral',
              {
                params: {
                  referrer: value
                }
              }
              )
            .success(function(data, status, headers, config) {
              ngModelCtrl.$setValidity('validReferral', true);
              ngModelCtrl.$setValidity('checkingReferral', true);
              SignupService.payment.referralDesc = data.resultSet.desc;
              SignupService.payment.referral = data.resultSet.account;
              if (SignupService.payment.amount < data.resultSet.min_threshold) {
                SignupService.payment.amount = data.resultSet.min_threshold;
              }
            })
            .error(function(data, status, headers, config) {
              ngModelCtrl.$setValidity('validReferral', false);
              ngModelCtrl.$setValidity('checkingReferral', true);
            });
          } else {
            ngModelCtrl.$setValidity('validReferral', false);
            ngModelCtrl.$setValidity('checkingReferral', true);
          }

          return value;
        }
      }

      ngModelCtrl.$parsers.push(validateReferral);
      ngModelCtrl.$formatters.push(validateReferral);

      scope.$watch(attrs.validateReferral, function () {
        ngModelCtrl.$setViewValue(ngModelCtrl.$viewValue);
      });
    }
  };
}]);
