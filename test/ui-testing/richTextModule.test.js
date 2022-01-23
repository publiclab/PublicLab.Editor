const timeout = process.env.SLOWMO ? 60000 : 10000;
const fs = require('fs');
let _module;

beforeAll(async () => {
  path = fs.realpathSync('file://../examples/index.html');
  await page.goto('file://' + path, {waitUntil: 'domcontentloaded'});
  await page.evaluateHandle(() => _module = new PL.RichTextModule( editor, {textarea: editor.options.textarea}));
});

describe('RichTextModule', () => {
  test('reports key, value, valid', async () => {
    expect(await page.evaluateHandle(() => _module)).toBeDefined();
    expect(await page.evaluate(() => _module.value())).not.toBe(false);
    expect(await page.evaluate(() => _module.value())).toBeDefined();
    expect(await page.evaluate(() => _module.key)).toBe('body');

    expect(await page.evaluate(() => _module.options.name)).toBe('body');
    expect(await page.evaluate(() => _module.options.required)).toBe(true);

    expect(await page.evaluate(() => _module.valid())).toBe(true);
  });

  test("sets and reports value regardless of whether it's in markdown or wysiwyg mode", async () => {
    await page.evaluate(() => _module.setMode('markdown'));
    await page.evaluate(() => _module.value('Test text'));
    expect(await page.evaluate(() => _module.value())).toBe('Test text');

    await page.evaluate(() => _module.setMode('wysiwyg'));
    expect(await page.evaluate(() => $(_module.editable).html())).toBe('<p>Test text</p>');
    expect(await page.evaluate(() => _module.value())).toBe('Test text');

    await page.evaluate(() => _module.value('Test text 2'));
    expect(await page.evaluate(() => _module.value())).toBe('Test text 2');

    await page.evaluate(() => _module.setMode('markdown'));
    await page.evaluate(() => _module.value('## Test title'));
    expect(await page.evaluate(() => _module.value())).toBe('## Test title');

    await page.evaluate(() => _module.setMode('html'));
    expect(await page.evaluate(() => $(_module.textarea).val())).toBe('<h2 id="test-title">Test title</h2>');

    await page.evaluate(() => _module.setMode('markdown'));
    expect(await page.evaluate(() => $(_module.textarea).val())).toBe('## Test title');
  });

  test("recognizes @callouts and #hashtags and #hash-tags", async () => {
    await page.evaluate(() => _module.setMode('markdown'));
    await page.evaluate(() => _module.value('Hello, @jeff!'));
    // shouldn't actually add markdown link around a callout:
    expect(await page.evaluate(() => _module.value())).not.toContain('[@jeff](/profile/jeff)');

    await page.evaluate(() => _module.setMode('wysiwyg'));
    expect(await page.evaluate(() => _module.html())).toContain('<a href="/profile/jeff">@jeff</a>');

    await page.evaluate(() => _module.value('Hi, #robots are cool!'));
    expect(await page.evaluate(() => _module.html())).toContain('<a href="/tag/robots">#robots</a>');

    await page.evaluate(() => _module.value('#balloon-mapping'));
    expect(await page.evaluate(() => _module.html())).toContain('<a href="/tag/balloon-mapping">#balloon-mapping</a>');
  });

  test("accepts customized authors method as constructor option for @callouts", async () => {
    await page.evaluate(() => {
      _module = new PL.RichTextModule( editor, {
        textarea: editor.options.textarea,
        authors: function(value, done) {
          done([
            {value: '@kirk', text: '@kirk; 1 note'},
            {value: '@spock', text: '@spock; 2 notes'},
            {value: '@uhura', text: '@uhura; 4 notes'},
            {value: '@bones', text: '@bones; 1 note'},
            {value: '@sulu', text: '@sulu; 5 notes'},
            {value: '@checkov', text: '@checkov; 1 note'}
          ]);
        }
      });
    });

    await page.evaluate(() => {
      _module.options.authors('', function(list) {
        listVal = list[0].value;
      });
    });
    expect(await page.evaluate(() => listVal)).toBe('@kirk');
  });

  test("detects data-urls", async () => {
    // switch to rich-text mode
    await page.evaluate(() => _module.setMode('wysiwyg'));

    // enter data-url
    await page.evaluate(() => _module.value('data:image/x'));

    // simulate enter press
    await page.evaluate(() => {
      e = $.Event("keyup", {keyCode: 13});
    });
    await page.evaluate(() => $('.ple-textarea').trigger(e));

    // detect data-urls
    expect(await page.evaluate(() => $('.data-urls-warning').length)).not.toBeNull();
  });

  test("displays alert for empty bold tags", async () => {
    await page.evaluate(() => {
      enter = $.Event("keydown", {keyCode: 13});
    });

    await page.evaluate(() => {
      tempEl = _module.textarea;
    });

    await page.evaluate(() => _module.setMode('markdown'));

    await page.evaluate(() => _module.textarea.innerHTML = '**');

    await page.evaluate(() => $(tempEl).trigger(enter));

    await page.evaluate(() => _module.textarea.innerHTML = '**');

    await page.evaluate(() => $(tempEl).trigger(enter));

    expect(await page.evaluate(() => $('.invalid-bold-tags-warning').length)).not.toBeNull();
  });
}, timeout);
