const timeout = process.env.SLOWMO ? 60000 : 10000;
const fs = require('fs');
let editor;
beforeAll(async () => {
  path = fs.realpathSync('file://../examples/index.html');
  await page.goto('file://' + path, {waitUntil: 'domcontentloaded'});
  await page.evaluate(() => {
    editor = new PL.Editor({
      textarea: document.querySelector('.ple-textarea')
    });
  });
});

describe('History', () => {
  test('has log, key, interval and id', async () => {
    expect( await page.evaluate(() => editor.history.log) ).toBeDefined();
    expect( await page.evaluate(() => editor.history.key) ).toBeDefined();
    expect( await page.evaluate(() => editor.history.options) ).toBeDefined();
    expect( await page.evaluate(() => editor.history.options.interval) ).toBeDefined();
    expect( await page.evaluate(() => editor.history.options.id) ).toBeDefined();
  });

  test('can be flushed', async () => {
    expect( await page.evaluate(() => editor.history.fetch()) ).not.toEqual([]);
    expect( await page.evaluate(() => editor.history.last()) ).not.toBe(null);

    await page.evaluate(() => editor.history.flush());

    expect( await page.evaluate(() => editor.history.fetch()) ).toEqual([]);
    expect( await page.evaluate(() => editor.history.last()) ).toBe(null);
  });

  test('adds, fetches and stores', async () => {
    await page.evaluate(() => editor.history.flush());
    expect( await page.evaluate(() => editor.history.fetch()) ).toEqual([]);
    expect( await page.evaluate(() => editor.history.last()) ).toBe(null);

    expect( await page.evaluate(() => document.querySelector('.ple-history-saving').style.display) ).toBe('none');
    await page.evaluate(() => editor.history.add('some text'));
    expect( await page.evaluate(() => editor.history.last().text) ).toBe('some text');
    expect( await page.evaluate(() => editor.history.last().timestamp) ).toBeDefined();

    expect( await page.evaluate(() => editor.history.fetch().length) ).toEqual(1);
    expect( await page.evaluate( () => editor.history.last().text) ).toBe('some text');

    await page.evaluate(() => editor.history.add('some more text'));
    expect( await page.evaluate( () => editor.history.last().text) ).toBe('some more text');
    expect( await page.evaluate(() => editor.history.last().timestamp) ).toBeDefined();
    expect( await page.evaluate(() => editor.history.fetch().length) ).toEqual(2);
  });

  test('creates new log entry when value() set', async () => {
    expect( await page.evaluate(() => editor.richTextModule.options.textarea.value.length) ).toBeGreaterThan(0);
    expect( await page.evaluate(() => editor.richTextModule.options.textarea) ).toBeDefined();
    await page.evaluate(() => editor.richTextModule.value("changed textarea text"));
    await page.evaluate(() => editor.history.check());
    expect(await page.evaluate(() => editor.history.last().text)).toBe("changed textarea text");
  });

  test('stores only 20 items until we optimize it', async () => {
    await page.evaluate(() => editor.history.flush());
    await page.evaluate(() => {
      for (let i = 0; i < 10; i++) {
        editor.history.add("some text " + i);
      }
    });
    expect( await page.evaluate(() => editor.history.log.length) ).toBe(10);

    await page.evaluate(() => {
      for (let i = 10; i < 20; i++) {
        editor.history.add("some text " + i);
      }
    });
    expect(await page.evaluate(() => editor.history.log.length)).toBe(20);

    await page.evaluate(() => {
      for (var i = 20; i < 30; i++) {
        editor.history.add("some text " + i);
      }
    });
    expect(await page.evaluate(() => editor.history.log.length)).toBe(20);

    await page.evaluate(() => editor.history.fetch());
    expect(await page.evaluate(() => editor.history.log.length)).toBe(20);
    expect(await page.evaluate(() => editor.history.log[0].text)).toBe('some text 10');
  });

  test('writes out history to a DOM element', async () => {
    await page.evaluate(() => $('body').append("<div id='history'></div>"));

    await page.evaluate(() => editor.history.display($('#history')[0]));

    expect(await page.evaluate(() => editor.history.log.length)).not.toBe(0);
    expect(await page.evaluate(() => $('#history').html())).not.toBe('');
    expect(await page.evaluate(() => $('#history p.log').length)).toBe(20);
    expect(await page.evaluate(() => $('#history p.day').length)).toBe(1);

    // start over and build DOM, checking as we go:
    await page.evaluate(() => editor.history.log = []);
    for (let i = 0; i < 10; i++) {
      await page.evaluate(() => {
        editor.history.add("some text " + i);
        editor.history.display($('#history')[0]);
      });
      expect(await page.evaluate(() => $('#history p.log').length)).toBe(1 + i);
    }
    expect(await page.evaluate(() => $('#history p.day').length)).toBe(1);
  });
}, timeout);