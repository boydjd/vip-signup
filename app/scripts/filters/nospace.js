'use strict';

angular.module('vipFilters')
  .filter('nospace', function () {
    return function (input, scope) {
      return (!input) ? '' : input.replace(/ /g, '');
    };
  });
