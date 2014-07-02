angular.module('signupApp')
  .directive('spinner', ['$parse', function ($parse) {
    'use strict';
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var fn = $parse(attrs.spinner);

        element.on('click', function (event) {
          scope.$apply(function () {
            attrs.$set('disabled', true);
            element.append(' <i class="fa fa-spinner fa-spin"></i>');

            fn(scope, {$event: event}).then(function(res) {
              attrs.$set('disabled', false);
              element.find('i').detach();
              return res;
            }, function (res) {
              attrs.$set('disabled', false);
              element.find('i').detach();
              return res;
            });
          });
        });
      }
    };
  }]);
