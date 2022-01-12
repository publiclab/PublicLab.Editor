const timeout = process.env.SLOWMO ? 60000 : 10000;
const fs = require('fs');
let editor;

beforeAll(async () => {
  path = fs.realpathSync('file://../examples/index.html');
  await page.goto('file://' + path, {waitUntil: 'domcontentloaded'});
});

describe('Prepopulated editor', () => {
  test('loads existing title, body, & tags', async () => {
    const title = 'My original title';
    const body = 'My **boring** original post.';
    const tags = 'my,old, tags';
    const mainImage = 0; // just a unique identifier

    await page.evaluate(() => document.querySelector('.ple-module-title input').value = 'My original title');
    await page.evaluate(() => document.querySelector('.ple-module-body textarea').value = 'My **boring** original post.');
    await page.evaluate(() => document.querySelector('.ple-module-tags input').value = 'my,old, tags');

    await page.evaluate(() => {
      editor = new PL.Editor({
        textarea: $('.ple-textarea')[0]
      });
    });

    expect( await page.evaluate(() => editor.richTextModule.value()) ).toBe(body);
    expect( await page.evaluate(() => editor.titleModule.value()) ).toBe(title);
    expect( await page.evaluate(() => editor.tagsModule.value()) ).toBe(tags);
  });

  test('accepts prepopulated values via constructor options, by key', async () => {
    const title = 'My original title';
    const body = 'My **boring** original post.';
    const tags = 'my,old, tags';
    const mainImageUrl = 'http://example.com/image.jpg';

    await page.evaluate(() => {
      editor = new PL.Editor({
        textarea: $('.ple-textarea')[0],
        title: 'My original title',
        body: 'My **boring** original post.',
        tags: 'my,old, tags',
        mainImageUrl: 'http://example.com/image.jpg'
      });
    });

    expect(await page.evaluate(() => editor.titleModule.value() )).toBe(title);
    expect(await page.evaluate(() => editor.richTextModule.value() )).toBe(body);
    expect(await page.evaluate(() => editor.tagsModule.value() )).toBe(tags);
    expect(await page.evaluate(() => editor.mainImageModule.options.url)).toBe(mainImageUrl);

    const url = await page.evaluate(() => editor.mainImageModule.el.find('.ple-drag-drop').css('background-image').replace(/"/g, '')); // phantomjs removes quotation marks
    expect(url).toBe('url(' + mainImageUrl + ')');

    await page.evaluate(() => editor.collectData());
    expect(await page.evaluate(() => editor.data.title )).toBe(title);
    expect(await page.evaluate(() => editor.data.body )).toBe(body);
    expect(await page.evaluate(() => editor.data.tags )).toBe(tags);
    expect(await page.evaluate(() => editor.data.main_image_url)).toBe(mainImageUrl);
  });
}), timeout;
