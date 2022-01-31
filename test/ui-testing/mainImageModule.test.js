const timeout = process.env.SLOWMO ? 60000 : 15000;
const fs = require('fs');
let editor;
beforeAll(async () => {
  path = fs.realpathSync('file://../examples/index.html');
  await page.goto('file://' + path, {waitUntil: 'domcontentloaded'});
});

describe('MainImageModule', () => {
  test('reports key, value, valid', async () => {
    await page.evaluate(() => {
      editor = new PL.Editor({
        textarea: $('.ple-textarea')[0],
        mainImageUrl: 'examples/example.gif'
      });
      _module = new PL.MainImageModule(editor, {});
    });

    expect(await page.evaluateHandle(() => _module)).toBeDefined();
    expect(await page.evaluate(() => _module.value())).not.toBe(false);
    expect(await page.evaluate(() => _module.value())).toBeDefined();
    expect(await page.evaluate(() => _module.key)).toBe('main_image_url');

    expect(await page.evaluate(() => _module.options.name)).toBe('main_image');
    expect(await page.evaluate(() => _module.options.required)).toBe(false);

    expect(await page.evaluate(() => _module.valid())).toBe(true);

    expect(await page.evaluate(() => _module.value('/image/url.jpg', 34))).toBe('/image/url.jpg');
    expect(await page.evaluate(() => editor.data.has_main_image)).toBe(true);
    expect(await page.evaluate(() => editor.data.image_revision)).toBe('/image/url.jpg');
    expect(await page.evaluate(() => _module.image.src)).toBe('file:///image/url.jpg');
    expect(await page.evaluate(() => _module.options.url)).toBe('/image/url.jpg');
  });

  test('makes upload request', async () => {
    const mainImageUrl = 'http://example.com/image.jpg';
    const nid = 3;
    const uid = 4;

    await page.evaluate(() => {
      editor = new PL.Editor({
        textarea: $('.ple-textarea')[0],
        mainImageModule: {
          nid: nid,
          uid: uid,
          uploadUrl: '/img' // overriding default '/images'
        }
      });
      _module = editor.mainImageModule;
    });

    expect(await page.evaluate(() => module.el.find('.progress-bar'))).toBeHidden();
  });

  xtest('xyz', async () => {

  });
}, timeout);
