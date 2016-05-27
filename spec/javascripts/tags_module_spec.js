var editor, module;

describe("TagsModule", function() {

  beforeAll(function() {

    fixture = loadFixtures('index.html');

    editor = new PL.Editor({
      textarea: $('.ple-textarea')[0]
    });

    module = new PL.TagsModule(editor, {});

  });


  it("reports key, value, valid", function() {

    expect(module).not.toBeUndefined();
//    expect(module.value()).not.toBe(false);
//    expect(module.value()).not.toBeUndefined();
    expect(module.key).toBe('tags');

    expect(module.options.name).toBe('tags');
    expect(module.options.required).toBe(false);

    expect(module.valid()).toBe(true);

  });


});
