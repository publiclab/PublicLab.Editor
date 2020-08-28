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

    module.value('related post');
    expect(module.value()).toBe('related post'); // should match 3 mocked results

    expect(module.valid()).toBe(true);
    expect($('.ple-title-related .result').length).toBe(3);  });

    // $('.ple-title-related .result .add-tag').click();
    // expect($('.ple-title-related . addedresult').length).toBe(1); // checks that it was indeed added
  });
