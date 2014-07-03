'use strict';

angular.module('signupApp')
  .factory('Validate', ['$http', 'Account', 'API_ENDPOINT', function Validate($http, Account, API_ENDPOINT) {
    var validate = {};

    validate.sendPIN = function() {
      $http.get(API_ENDPOINT + '/rest/v1/activate/sendPIN', { params: { accountNumber: Account.accountId } });
    };
    
    return validate;
  }]);
