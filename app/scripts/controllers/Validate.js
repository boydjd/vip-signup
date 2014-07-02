'use strict';

angular.module('signupApp')
  .controller('ValidateCtrl', ['$scope', '$http', '$timeout', 'Account', 'SignupService', 'API_ENDPOINT',
      function ($scope, $http, $timeout, Account, SignupService, API_ENDPOINT) {
    $scope.sendPIN = function() {
      if (typeof SignupService.activation === 'undefined' || !SignupService.activation) { 
        $http.get(API_ENDPOINT + 'activate/sendPIN', { params: { accountNumber: Account.accountId } }); 
      }
    };
  }]);
