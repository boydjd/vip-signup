'use strict';

angular.module('signupApp')
.directive('uniquePhone', ['$http', '$timeout', 'API_ENDPOINT', function ($http, $timeout, API_ENDPOINT) {
  return {
    require: 'ngModel',
    link: function (scope, elem, attr, ctrl) {
      function setAsLoading(bool) {
        ctrl.$setValidity('checkingPhone', !bool);
      }

      function setAsAvailable(bool) {
        ctrl.$setValidity('phoneAvailable', bool);
      }

      ctrl.$parsers.push(function (value) {
        if (!value || value.length == 0) return;

        var valid = false;

        setAsLoading(true);
        setAsAvailable(false);

        $http.get(API_ENDPOINT + 'validate/uniquePhoneNumber', { params: { phoneNumber: value }})
        .success(function (data) {
          setAsLoading(false);
          setAsAvailable(data.resultSet.unique);
          valid = true;
        })
        .error(function() {
          setAsLoading(false);
          setAsAvailable(false);
        });

        return value;
      });
    }
  };
}]);
