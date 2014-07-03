'use strict';

angular.module('signupApp')
.directive('validatePromotion', ['$http', '$timeout', 'SignupService', 'API_ENDPOINT', function ($http, $timeout, SignupService, API_ENDPOINT) {
  return {
    require: 'ngModel',
    scope: {
      amountmodel: '@amountmodel'
    },
    link: function postLink(scope, element, attrs, ngModelCtrl) {
      function validatePromotion(value) {
        ngModelCtrl.$setValidity('validPromotion', true);

        if (typeof value === 'undefined' || value === '') {
          SignupService.payment.bonus = parseInt(0, 10);
          SignupService.payment.promoDesc = '';
          ngModelCtrl.$setPristine();
        } else if (ngModelCtrl.$valid) {
          ngModelCtrl.$setValidity('checkingPromotion', false);

          if (value !== '' && typeof value !== 'undefined') {
            $http.get(
              API_ENDPOINT + '/rest/v1/validate/promotionCode',
              {
                params: {
                  promotionCode: value
                }
              }
              )
            .success(function(data, status, headers, config) {
              ngModelCtrl.$setValidity('validPromotion', true);
              ngModelCtrl.$setValidity('checkingPromotion', true);

              SignupService.payment.promoDesc = data.resultSet.desc;
              SignupService.payment.promotionType = data.resultSet.type;

              if (data.resultSet.type == 'VOUCHER') {
                SignupService.payment.amount = 0;
                SignupService.payment.bonus = parseInt(data.resultSet.credit, 10);
              } else {
                SignupService.payment.amount = parseInt(data.resultSet.min_threshold, 10);
                SignupService.payment.bonus = parseInt(data.resultSet.bonus, 10);
              }
            })
            .error(function(data, status, headers, config) {
              ngModelCtrl.$setValidity('validPromotion', false);
              ngModelCtrl.$setValidity('checkingPromotion', true);
            });
          } else {
            ngModelCtrl.$setValidity('validPromotion', false);
            ngModelCtrl.$setValidity('checkingPromotion', true);
          }
        }

        return value;
      }

      ngModelCtrl.$parsers.push(validatePromotion);
      ngModelCtrl.$formatters.push(validatePromotion);

      scope.$watch(attrs.validatePromotion, function () {
        ngModelCtrl.$setViewValue(ngModelCtrl.$viewValue);
      });
    }
  };
}]);
