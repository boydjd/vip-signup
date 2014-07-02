'use strict';

angular.module('signupApp')
  .directive('cardExpiration', function () {
    return {
      require: 'ngModel',
      link: function postLink(scope, element, attrs, ctrl) {
        scope.$watchCollection('[ccinfo.month, ccinfo.year]', function (newValues, oldValues) {
          ctrl.$setValidity('past', false);

          if (typeof newValues["0"] !== 'undefined' && typeof newValues["1"] !== 'undefined') {
            ctrl.$setValidity('past', true);
            if (newValues["1"] == scope.currentYear && newValues["0"].value < scope.currentMonth) {
              ctrl.$setValidity('past', false);
            }
          }
        });
      }
    };
  });
