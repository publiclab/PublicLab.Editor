const timeout = process.env.SLOWMO ? 60000 : 10000;
const fs = require('fs');
let editor;
let _module; // couldn't use "module" because module was already defined by Nodejs

beforeAll(async () => {
  path = fs.realpathSync('file://../examples/index.html');
  await page.goto('file://' + path, {waitUntil: 'domcontentloaded'});
  await page.evaluate(() => {
    editor = new PL.Editor({
      textarea: document.querySelector('.ple-textarea')
    });
    _module = new PL.TagsModule(editor, {});
  });
});

describe('TagsModule', () => {
  test('reports key, value, valid', async () => {
    expect(await page.evaluateHandle(() => _module)).toBeDefined();
    expect(await page.evaluate(() => _module.key)).toBe('tags');

    expect(await page.evaluate(() => _module.value())).not.toBe(false);
    expect(await page.evaluate(() => _module.value())).toBe('');
    await page.evaluate(() => _module.value('cool,rad'));
    expect(await page.evaluate(() => _module.value())).toBe('cool,rad');

    expect(await page.evaluate(() => _module.options.name)).toBe('tags');
    expect(await page.evaluate(() => _module.options.required)).toBe(false);

    expect(await page.evaluate(() => _module.valid())).toBe(true);
  });

  test('adds value to "tags" key of editor.data, instead of overwritting it', async () => {
    expect(await page.evaluate(() => _module.value())).toBe('cool,rad');
    await page.evaluate(() => editor.data[_module.key] = 'first');
    expect(await page.evaluate(() => editor.data.hasOwnProperty(_module.key))).toBe(true);
    expect(await page.evaluate(() => editor.data[_module.key])).toBe('first');
    expect(await page.evaluate(() => _module.value())).toBe('first,cool,rad');
  });
}, timeout);
