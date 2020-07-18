var editor; var module;

describe("TitleModule", function() {
  beforeAll(function() {
    fixture = loadFixtures('index.html');

    editor = new PL.Editor({
      textarea: $('.ple-textarea')[0]
    });

    module = new PL.TitleModule(editor, {});
  });

  it("value, valid, key", function() {
    expect(module).not.toBeUndefined();
    expect(module.key).toBe('title');

    expect(module.value()).not.toBe(false);
    expect(module.value()).toBe('');

    module.value('My new post:');
    expect(module.value()).toBe('My new post:');

    expect(module.valid()).toBe(true);
  });
});
