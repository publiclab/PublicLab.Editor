var editor;

describe("History", function() {

  beforeAll(function() {

    fixture = loadFixtures('index.html');

    editor = new PL.Editor({
      textarea: $('.ple-textarea')[0]
    });

  });


  afterEach(function() {
  });


  it("has log, key, interval, and id", function() {

    expect(editor.history.log).not.toBeUndefined();
    expect(editor.history.key).not.toBeUndefined();
    expect(editor.history.options).not.toBeUndefined();
    expect(editor.history.options.interval).not.toBeUndefined();
    expect(editor.history.options.id).not.toBeUndefined();

  });


  it("can be flushed", function() {

    expect(editor.history.fetch()).not.toEqual([]);
    expect(editor.history.last()).not.toBe(null);

    editor.history.flush();

    expect(editor.history.fetch()).toEqual([]);
    expect(editor.history.last()).toBe(null);

  });


  it("adds, fetches, and stores", function() {

    editor.history.flush();
    expect(editor.history.fetch()).toEqual([]);
    expect(editor.history.last()).toBe(null);

    expect($('.ple-history-saving').is(':visible')).toBe(false);
    editor.history.add("some text");
    expect(editor.history.last().text).toBe("some text");
    expect(editor.history.last().timestamp).not.toBeUndefined();

    expect(editor.history.fetch().length).toEqual(1);
    expect(editor.history.last().text).toBe("some text");

    editor.history.add("some more text");
    expect(editor.history.last().text).toBe("some more text");
    expect(editor.history.last().timestamp).not.toBeUndefined();

    expect(editor.history.fetch().length).toEqual(2);
    expect(editor.history.last().text).toBe("some more text");

  });


  it("creates new log entry when value() set", function() {

    expect($(editor.richTextModule.options.textarea).length).toBeGreaterThan(0);
    editor.richTextModule.value("changed textarea text");
    editor.history.check();
    expect(editor.history.last().text).toBe("changed textarea text");

  });


  it("stores only 20 items until we optimize it", function() {

    editor.history.flush();
    for (var i = 0; i < 20; i++) {
      editor.history.add("some text");
    }
    expect(editor.history.log.length).toBe(20);

    editor.history.fetch();
    expect(editor.history.log.length).toBe(20);

  });


  xit("writes out history to a DOM element", function() {

    $('html').append("<div id='history'></div>");

    editor.history.display($('#history'));

  });


});
