'use strict';

/**
 * Usage: Add pw-check="id of pw1" to pw2 input
 *        For error block, add ng-show="form.pw2.$error.pwmatch" to the error div
 *
 * Taken from http://blog.brunoscopelliti.com/angularjs-directive-to-check-that-passwords-match
 */

angular.module('signupApp')
.directive('pwCheck', function () {
  return {
    require: 'ngModel',
    link: function (scope, elem, attrs, ctrl) {
      var firstPassword = '#' + attrs.pwCheck;
      elem.add(firstPassword).on('keyup', function () {
        scope.$apply(function () {
          ctrl.$setValidity('pwmatch', elem.val() === $(firstPassword).val());
        });
      });
    }
  }
});
