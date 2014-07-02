'use strict';

/**
 * A directive which wraps the Bootstrap Form Helper Country Picker Plugin
 *
 * @author Josh Boyd <joshuab@joinvip.com>
 * @copyright VIP Communications, Inc. 2013
 * @module signupApp
 */

angular.module('signupApp')
.directive('countryPicker', ['$timeout', function ($timeout) {
  return {
    require: 'ngModel',
    link: function (scope, element, attrs, ngModelCtrl) {
      scope.$watch(ngModelCtrl, function() {
          element.data('country', ngModelCtrl.$viewValue);
          element.bfhcountries(element.data());
          $timeout(function() {
            element.change();
          }, 0, false);
      });
    }
  };
}]);
