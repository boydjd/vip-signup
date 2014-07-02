'use strict';

describe('Directive: editableCurrency', function () {

  // load the directive's module
  beforeEach(module('signupApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<editable-currency></editable-currency>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the editableCurrency directive');
  }));
});
