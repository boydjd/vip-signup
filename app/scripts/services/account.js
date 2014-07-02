'use strict';

angular.module('signupApp')
  .factory('Account', function () {
    var accountService = {};

    accountService.accountId = '';

    return accountService;
  });
