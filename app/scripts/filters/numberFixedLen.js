'use strict';

angular.module('vipFilters')
  .filter('numberFixedLen', function () {
    return function (value,length) {
      return (1e4 + value + "").slice(-length);
    };
  });
