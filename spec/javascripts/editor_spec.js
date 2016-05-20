var editor;

describe("Editor", function() {

  beforeAll(function() {

    fixture = loadFixtures('index.html');

    editor = new PL.Editor({
      textarea: $('.ple-textarea')[0]
    });

  });


  afterEach(function() {
  });


  it("exists, and has a textarea", function() {

    expect($('.ple-textarea')[0]).not.toBeUndefined();
    expect(editor).not.toBeUndefined();
    expect(editor.options.textarea).not.toBeUndefined();
    expect(editor.options.textarea).toBe($('.ple-textarea')[0]);

  });


  it("counts valid modules and enables publish button", function() {

    expect(editor.modules.titleModule.el.find('input').val()).toBe("");
    expect(editor.modules.titleModule.valid()).toBe(false);

    expect(editor.validate()).toBe(false);

    editor.modules.richTextModule.value(""); // empty it
    expect(editor.modules.richTextModule.value()).toBe("");
    expect(editor.modules.richTextModule.valid()).toBe(false);

    editor.modules.titleModule.value("My title");
    editor.modules.richTextModule.value("My content");
    expect(editor.validate()).toBe(true);

  });


});
