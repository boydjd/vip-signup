'use strict';

angular.module('signupApp')
.directive('uniqueEmail', ['$http', '$timeout', 'API_ENDPOINT', function ($http, $timeout, API_ENDPOINT) {
  return {
    require: 'ngModel',
    link: function (scope, elem, attr, ctrl) {
      function setAsLoading(bool) {
        ctrl.$setValidity('checkingEmail', !bool);
      }

      function setAsAvailable(bool) {
        ctrl.$setValidity('emailAvailable', bool);
      }

      ctrl.$parsers.push(function (value) {
        if (!value || value.length == 0) return;

        setAsLoading(true);
        setAsAvailable(false);

        $http.get(API_ENDPOINT + 'validate/uniqueEmail', { params: { email: value }})
        .success(function (data) {
          setAsLoading(false);
          setAsAvailable(data.resultSet.unique);
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
