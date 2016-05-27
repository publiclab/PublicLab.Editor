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

    expect($(editor.modules.richTextModule.options.textarea).length).toBeGreaterThan(0);
    editor.modules.richTextModule.value("changed textarea text");
    editor.history.check();
    expect(editor.history.last().text).toBe("changed textarea text");

  });


});
