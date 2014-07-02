'use strict';

/**
 * A directive which wraps the Bootstrap Form Helper State Picker Plugin
 *
 * @author Josh Boyd <joshuab@joinvip.com>
 * @copyright VIP Communications, Inc. 2014
 * @module signupApp
 */

angular.module('signupApp')
.directive('phoneFormat', function () {
  return {
    link: function (scope, element, attrs, ngModelCtrl) {
      element.data('number', attrs.number);
      element.bfhphone(element.data());
    }
  };
});
