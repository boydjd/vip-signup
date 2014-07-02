'use strict';

angular.module('signupApp')
  .controller('SendAppLinkCtrl', ['$scope', '$http', '$timeout', '$state', 'API_ENDPOINT', 'alertService', 'SignupService', 
      function ($scope, $http, $timeout, $state, API_ENDPOINT, alertService, SignupService) {
    $scope.send = function() {
      var signup = SignupService;
      var url = '';
      var device = signup.callingMethod; 
      var phoneNumber = signup.user.phoneNumber;

      if (device === 'Android') {
        url = API_ENDPOINT + 'vipconnect/android/sendlink';
      } else { 
        url = API_ENDPOINT + 'vipconnect/apple/sendlink'; 
      } 

      var request = $http.get(url, { params: { phoneNumber: phoneNumber} });

      request.then(
        function (response) {
          if (response.data.status === "Successful") {
            $state.go('gca.vipconnect');
          } else {
            alertService.add('danger', 'An error occured while trying to send the application. Please try again.');
          }
        },
        function (data) {
          alertService.add('danger', 'An error occured while trying to send the application. Please try again.');
        });

      return request;
    };
  }]);
