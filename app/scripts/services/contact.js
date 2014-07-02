'use strict';

angular.module('signupApp')
  .factory('ContactService', function () {
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

    return contact;
  });
