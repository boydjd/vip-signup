'use strict';

/**
 * A directive which wraps the Bootstrap Form Helper State Picker Plugin
 *
 * @author Josh Boyd <joshuab@joinvip.com>
 * @copyright VIP Communications, Inc. 2014
 * @module signupApp
 */

angular.module('signupApp')
.directive('statePicker', function () {
  return {
    require: 'ngModel',
    link: function (scope, element, attrs, ngModelCtrl) {
      scope.$watch(ngModelCtrl, function() {
          element.data('state', ngModelCtrl.$viewValue);
          element.bfhstates(element.data());
      });
    }
  };
});
