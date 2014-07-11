'use strict';

angular.module('signupApp')
  .factory('WelcomeMail', ['$http', 'PaymentService', 'Account', 'SignupService', 'API_ENDPOINT', function WelcomeMail($http, PaymentService, Account, SignupService, API_ENDPOINT) {
    var welcome = {};

    welcome.activationSent = false;
    welcome.confirmationSent = false;

    welcome.send = function(template) {
      $http.put(
        API_ENDPOINT + '/rest/v1/signupemail',
        {
          accountNumber: Account.accountId, 
          auditId: SignupService.payment.auditId,
          template: template
        }
      );
    };

    welcome.sendEmail = function() {
      var offer = SignupService.offer,
          device = SignupService.callingMethod,
          activated = SignupService.activation;

      if ((device === 'Android' || device === 'iPhone') && (!this.confirmationSent && !this.activationSent)) {
        // Android/iPhone
        if (offer === 'minutes') {
          this.send('Welcome Letter 1');
        } else {
          this.send('Welcome Letter 2');
        }

        this.activationSent = true;
        this.confirmationSent = true;
      } else if (device === 'hotel' && !this.confirmationSent && !this.activationSent) {
        // Hotel
        this.send('Welcome Letter 11');
        this.activationSent = true;
        this.confirmationSent = true;
      } else if (typeof SignupService.dlg !== 'undefined' && SignupService.dlg.ddi) { // this is incorrect, check for an assigned number
        //DLG
        if (activated && !this.confirmationSent) {
          this.send('Welcome Letter 12');
          this.activationSent = true;
          this.confirmationSent = true;
        } else if(!this.activationSent) {
          this.send('Welcome Letter 13');
          this.activationSent = true;
        }
      } else {
        if (offer === 'minutes') {
          // 5MF
          if (typeof SignupService.contact !== 'undefined') {
            // With contacts
            if (activated && !this.confirmationSent) {
              this.send('Welcome Letter 3');
              this.activationSent = true;
              this.confirmationSent = true;
            } else if (!this.activationSent) {
              this.send('Welcome Letter 4');
              this.activationSent = true;
            }
          } else {
            // Without contacts
            if (activated && !this.confirmationSent) {
              this.send('Welcome Letter 5');
              this.activationSent = true;
              this.confirmationSent = true;
            } else if (!this.activationSent) {
              this.send('Welcome Letter 6');
              this.activationSent = true;
            }
          }
        } else {
          // 5 dollars free
          if (typeof SignupService.contact !== 'undefined') {
            // With contacts
            if (activated && !this.confirmationSent) {
              this.send('Welcome Letter 7');
              this.activationSent = true;
              this.confirmationSent = true;
            } else if (!this.activationSent) {
              this.send('Welcome Letter 8');
              this.activationSent = true;
            }
          } else {
            // Without contacts
            if (activated && !this.confirmationSent) {
              this.send('Welcome Letter 9');
              this.activationSent = true;
              this.confirmationSent = true;
            } else if (!this.activationSent) {
              this.send('Welcome Letter 10');
              this.activationSent = true;
            }
          }
        }
      }
    };

    return welcome;
  }]);
