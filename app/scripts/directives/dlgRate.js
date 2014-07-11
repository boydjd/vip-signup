'use strict';

angular.module('signupApp')
  .directive('dlgRate', ['$http', 'SignupService', function ($http, SignupService) {
    return {
      require: 'ngModel',
      link: function postLink(scope, element, attrs, ngModelCtrl) {
        scope.$watch( function() {
          return scope.dlgForm.inputPhoneNumber.$invalid;
        },
        function (newVal) {
          if (!newVal) {
            var rateParams = $.param({
              func: "signup_getPerMinuteCharge",
              type: "ghana",
              number: scope.$parent.signup.user.phoneNumber,
              ddi: SignupService.dlg.ddi
            }); 

            $http({
              method: 'POST',
              headers: {'Content-Type': 'application/x-www-form-urlencoded'},
              url: '//192.168.100.96/myaccount/directLine_ajax.php',
              data: rateParams
            })
            .success(function(data, status, headers, config) {
              var rate = data*100; 

              if (rate > 0) {
                element.html(rate + "&cent; per minute");
              }
            });
          }
        });
      }
    };
  }]);
