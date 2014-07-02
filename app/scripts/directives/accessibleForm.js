'use strict';

angular.module('signupApp')
  .directive('accessibleForm', function () {
    return {
      link: function (scope, element) {
        element.on('submit', function () {
          var invalid = element.find('.ng-invalid:first');
          invalid.parents('.control-group').addClass('error');
          invalid.focus();
        });
      }
    }
  }
);
