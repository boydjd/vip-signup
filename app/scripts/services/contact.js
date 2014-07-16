'use strict';

angular.module('signupApp')
  .factory('ContactService', ['$http', 'Account', 'SignupService', 'API_ENDPOINT', function ($http, Account, SignupService, API_ENDPOINT) {
    var contact = [];

    contact.addContact = function(device, country, name, phoneNumber) {
      device = typeof device !== 'undefined' ? device : 'Mobile';
      country = typeof country !== 'undefined' ? country : 'US';
      name = typeof name !== 'undefined' ? name : '';
      phoneNumber = typeof phoneNumber !== 'undefined' ? phoneNumber : '';

      this.push({ device: device, country: country, name: name, phoneNumber: phoneNumber });
    };

    contact.removeContact = function(obj) {
      var index = this.indexOf(obj);

      if (index != -1) {
        this.splice(index, 1);
      }
    };

    contact.reset = function() {
      for (var key in this) {
        this.key = undefined;
      }
    };

    contact.persist = function() {
      var data = {
        token: Account.token 
      };

      var phoneNumber = SignupService.contact.phoneNumber.replace(/\D/g,'');

      data.tSPName = [];
      data.tSPNumber = [];
      data.tSPCountry = [];

      if (SignupService.contact.country == 'US') {
        phoneNumber = phoneNumber.substring(1);
      } else {
        phoneNumber = '011' + phoneNumber;
      }

      data.tSPName.push(SignupService.contact.firstName);
      data.tSPNumber.push(phoneNumber);
      data.tSPCountry.push(SignupService.contact.country);

      $http.post(
        API_ENDPOINT + '/rest/v1/Account/contact',
        data
      );

    };


    return contact;
  }]);
