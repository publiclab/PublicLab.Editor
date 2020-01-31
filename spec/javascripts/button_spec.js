var editor;

describe("Publish button", function() {

  beforeAll(function() {

    fixture = loadFixtures('index.html');

    editor = new PL.Editor({
      textarea: $('.ple-textarea')[0]
    });

  });


  it("Publish button is enabled", function() {
    // Check initially that Publish button is disabled.
    expect($('.ple-publish').prop('disabled')).toBe(true);
    // Add title.
    $('.ple-module-title input').val('A title');
    $('.ple-module-title input').keydown();
    // Check final state of Publish button.
    expect($('.ple-publish').prop('disabled')).toBe(false);    

  });


});
