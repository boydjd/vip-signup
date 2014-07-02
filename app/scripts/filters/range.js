'use strict';

angular.module('vipFilters')
  .filter('range', function () {
    return function (arr, lower, upper) {
      for (var i = lower; i <= upper; i++) {
        arr.push(i);
      }
      return arr;
    }
});
