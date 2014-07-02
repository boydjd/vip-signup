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


    payment.process = function() {
      if (this.ccinfo.month < 10) {
        this.ccinfo.month = "0" + this.ccinfo.month;
      }

      var promise = $http({
        url: API_ENDPOINT + 'payment/newCard/ivr',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        method: 'POST',
        data: $.param({
          cardType: this.ccinfo.type,
          accountNumber: Account.accountId,
          transactionType: 6,
          cardNumber: this.cardNumber,
          cardExpirationDate: this.ccinfo.month + this.ccinfo.year,
          cardSecurityCode: this.cardSecurityCode,
          billingZipCode: this.zip,
          amount: this.amount
        })
      })
      .success(function(data, status, headers, config) {
        return data;
      })
      .error(function(data, status, headers, config) {
      });

      return promise;
    }
          
    return payment;
  }]);
