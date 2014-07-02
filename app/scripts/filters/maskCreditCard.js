'use strict';

angular.module('vipFilters')
  .filter('maskCreditCard', function () {
    return function (input, scope) {
      if (input != null) {
        return "XXXX-XXXX-XXXX-" + input.substr(input.length - 4);
      }
    }
  });
