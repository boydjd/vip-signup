'use strict';

angular.module('signupApp')
  .factory('UserService', function () {
    var user = {};

    user.firstName = undefined;
    user.lastName = undefined;
    user.phoneNumber = undefined;
    user.email = undefined;
    user.country = undefined;
    user.password1= undefined;
    user.password2 = undefined;

    return user;
  });
