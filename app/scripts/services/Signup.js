'use strict';

angular.module('signupApp')
  .factory('SignupService', ['$http', '$timeout', 'PaymentService', 'UserService', function ($http, $timeout, PaymentService, UserService) {
    var signup = {};

    signup.contacts = {};
    signup.payment  = PaymentService;
    signup.user = UserService;

    signup.fname = undefined;
    signup.lname = undefined;
    signup.phoneNumber = undefined;
    signup.email = undefined;
    signup.callingMethod = undefined;

    signup.dlg = {};

    signup.reset = function() {
      for (var key in this) {
        this.key = undefined;
      }

      ContactService.reset();
      PaymentService.reset();
      UserService.reset();

      signup.payment = PaymentService;
      signup.user = UserService;
    };

    return signup;
  }]);
