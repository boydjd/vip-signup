'use strict';

angular.module('signupApp')
  .controller('InitialCreationCtrl', ['$scope', '$http', '$q', '$state', 'Account', 'SignupService', 'API_ENDPOINT', 'alertService', function ($scope, $http, $q, $state, Account, SignupService, API_ENDPOINT, alertService) {
    $scope.createAccount = function() {
      var signup = SignupService;
      var callingMethod = signup.callingMethod;

      var request = $http({
        method: 'PUT',
          url: API_ENDPOINT + 'signup',
          data: {
            fname: signup.user.firstName,
            lname: signup.user.lastName,
            phoneNumber: signup.user.phoneNumber,
            country: signup.payment.country,
            email: signup.user.email,
            offer: signup.offer 
          }
        }).then(
          function(response) {
            if (response.data.status === "Successful") {
              Account.accountId = response.data.resultSet.accountId;
              Account.guid = response.data.resultSet.guid;

              if (callingMethod !== 'Android' && callingMethod !== 'iPhone' && callingMethod !== 'hotel') { 
                $state.go('gca.step2');
              } else {
                $state.go('gca.payment');
              }
            } else {
              alertService.add('danger', 'Account creation failed. Please try again or contact customer service.');
            }
          },
          function(data) {
            alertService.add('danger', 'Account creation failed. Please try again or contact customer service.');
          });

      return request;
    };
  }]);
