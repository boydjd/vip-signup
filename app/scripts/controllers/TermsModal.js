'use strict';

angular.module('signupApp')
.controller('TermsModalCtrl', ['$scope', '$modal', function ($scope, $modal) {
  $scope.open = function () {
    var modalInstance = $modal.open({
      templateUrl: 'views/terms.html',
        controller: 'ModalInstanceCtrl'
    });
  };
}]);
