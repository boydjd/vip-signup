'use strict';

angular.module('signupApp')
  .factory('PaymentService', ['$http', '$timeout', 'Account', 'API_ENDPOINT', function ($http, $timeout, Account, API_ENDPOINT) {
    var payment = {};

    payment.promotionCode = 'JOINVIP5';
    payment.ccinfo = { type: undefined };
    payment.cardNumber = undefined;
    payment.cardSecurityCode = 566;
    payment.zip = undefined;
    payment.amount = undefined;
    payment.autoRecharge = undefined;

    payment.reset = function() {
      for (var key in this) {
        this.key = undefined;
      }
      payment.promotionCode = 'JOINVIP5';
      payment.ccinfo = { type: undefined };
    }

    return payment;
  }]);
