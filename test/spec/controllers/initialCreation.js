'use strict';

describe('Controller: InitialcreationCtrl', function () {

  // load the controller's module
  beforeEach(module('signupApp'));

  var InitialcreationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InitialcreationCtrl = $controller('InitialcreationCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
