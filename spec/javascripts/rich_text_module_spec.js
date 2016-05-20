var editor, module;

describe("RichTextModule", function() {

  beforeAll(function() {

    fixture = loadFixtures('index.html');

    editor = new PL.Editor({
      textarea: $('.ple-textarea')[0]
    });

    module = new PL.RichTextModule(editor, {});

  });


  afterEach(function() {
  });


  xit("reports key, value, valid", function() {

    expect(module).not.toBeUndefined();
    expect(module.value()).not.toBe(false);
    expect(module.value()).not.toBeUndefined();
    expect(module.key).toBe('main_image_url');

    expect(module.options.name).toBe('main_image');
    expect(module.options.required).toBe(false);

    expect(module.valid()).toBe(true);
    //_module.height = function() {

  });

  xit("sets and reports value regardless of whether it's in markdown or wysiwyg mode", function() {

    module.wysiwyg.setMode('markdown');
    module.value('Test text');
    expect(module.value()).toBe('Test text');

    module.wysiwyg.setMode('wysiwyg');
    module.value('Test text');
    expect(module.value()).toBe('Test text');
    expect($(module.wysiwyg.textarea).val()).toBe('<p>Test text</p>');

  });


});
