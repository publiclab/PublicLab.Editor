var editor;

describe("Editor", function() {

  beforeAll(function() {

    fixture = loadFixtures('index.html');

    editor = new PL.Editor({
      textarea: $('.ple-textarea')[0]
    });

  });


  it("exists, and has a textarea", function() {

    expect($('.ple-textarea')[0]).not.toBeUndefined();
    expect(editor).not.toBeUndefined();
    expect(editor.options.textarea).not.toBeUndefined();
    expect(editor.options.textarea).toBe($('.ple-textarea')[0]);

  });


  it("counts valid modules and enables publish button", function() {

    expect(editor.titleModule.el.find('input').val()).toBe("");
    expect(editor.titleModule.valid()).toBe(false);

    expect(editor.validate()).toBe(false);

    editor.richTextModule.wysiwyg.setMode('markdown');
    editor.richTextModule.value(""); // empty it
    expect(editor.richTextModule.value()).toBe("");
    expect(editor.richTextModule.valid()).toBe(false);

    editor.titleModule.value("My title");
    editor.richTextModule.value("My content");
    expect(editor.validate()).toBe(true);

  });


  xit("sends AJAX request on editor.publish()", function() {

    editor.publish();

  });


});
