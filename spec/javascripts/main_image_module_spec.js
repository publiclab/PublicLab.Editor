var editor, module;

describe("MainImageModule", function() {

  beforeAll(function() {

    fixture = loadFixtures('index.html');

    // clear out localstorage for testing purposes
    //...

    editor = new PL.Editor({
      textarea: $('.ple-textarea')[0]
    });

    module = new PL.MainImageModule(editor, {});

  });


  afterEach(function() {
  });


  it("reports key, value, valid", function() {

    expect(module).not.toBeUndefined();
//    expect(module.value()).not.toBe(false);
//    expect(module.value()).not.toBeUndefined();
    expect(module.key).toBe('main_image_url');

    expect(module.options.name).toBe('main_image');
    expect(module.options.required).toBe(false);

    expect(module.valid()).toBe(true);

  });


});
