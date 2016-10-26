var editor;

describe("Errors", function() {

  beforeAll(function() {

    fixture = loadFixtures('index.html');

    editor = new PL.Editor({
      textarea: $('.ple-textarea')[0],
      errors: {
        "title": ["can't be blank"]
      }
    });

  });


  it("displays given errors", function() {

    expect($('.ple-errors').length).not.toBe(0);
    expect($('.ple-errors .alert').length).toBe(1);
    expect($('.ple-errors p').length).toBe(1);
    expect($('.ple-errors p').text()).toBe("Error: title can't be blank.");

  });


});

