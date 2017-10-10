'use strict';

describe('Component: PostComponent', function() {
  // load the controller's module
  beforeEach(module('magicLeapBlogApp.post'));

  var PostComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    PostComponent = $componentController('post', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
