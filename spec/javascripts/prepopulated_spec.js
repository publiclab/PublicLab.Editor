var editor;

describe("Prepopulated editor", function() {

  beforeEach(function() {

    fixture = loadFixtures('index.html');

  });


  it("loads existing title, body, & tags", function() {

    var title = 'My original title',
        body  = 'My **boring** original post.',
        tags  = 'my,old, tags';

    $('.ple-module-title input').val(title);
    $('.ple-module-body textarea').val(body);
    $('.ple-module-tags input').val(tags);

    editor = new PL.Editor({
      textarea: $('.ple-textarea')[0]
    });

    expect(editor.titleModule.value()).toBe(title);
    expect(editor.richTextModule.value()).toBe(body);
    expect(editor.tagsModule.value()).toBe(tags);

  });


  it("accepts prepopulated values via constructor options, by key", function() {

    var title = 'My original title',
        body  = 'My **boring** original post.',
        tags  = 'my,old, tags';

    editor = new PL.Editor({
      textarea: $('.ple-textarea')[0],
      title: title,
      body: body,
      tags: tags
    });

    expect(editor.titleModule.value()).toBe(title);
    expect(editor.richTextModule.value()).toBe(body);
    expect(editor.tagsModule.value()).toBe(tags);
  });


  xit("submits update() with new values", function() {

    var title = 'My original title',
        body  = 'My **boring** original post.',
        tags  = 'my,old, tags';

    editor = new PL.Editor({
      textarea: $('.ple-textarea')[0],
      title: title,
      body: body,
      tags: tags
    });

    editor.titleModule.value('My fancy new title');

    editor.publish();

  });


});
