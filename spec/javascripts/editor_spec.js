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


});
