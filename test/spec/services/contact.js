'use strict';

describe('Service: Contact', function () {

  // load the service's module
  beforeEach(module('signupApp'));

  // instantiate service
  var Contact;
  beforeEach(inject(function (_Contact_) {
    Contact = _Contact_;
  }));

  it('should do something', function () {
    expect(!!Contact).toBe(true);
  });

});
