const timeout = process.env.SLOWMO ? 60000 : 10000;
const fs = require('fs');
let editor;

beforeAll(async () => {
  path = fs.realpathSync('file://../examples/index.html');
  // scriptPath = fs.realpathSync('file://../node_modules/jquery/dist/jquery.min.js');
  // await page.addScriptTag({path: scriptPath});
  await page.goto('file://' + path, {waitUntil: 'domcontentloaded'});
  await page.evaluate(() => {
    editor = new PL.Editor({
      textarea: document.querySelector('.ple-textarea')
    });
  });
});

describe('Errors', () => {
  test('Editor exists and has a textarea', async () => {
    expect( await page.evaluate(() => document.querySelector('.ple-textarea')) ).toBeDefined();
    expect( await page.evaluateHandle(() => editor) ).toBeDefined();
    expect( await page.evaluateHandle(() => editor.options.textarea) ).toBeDefined();
    expect( await page.evaluateHandle(() => editor.options.textarea.innerHTML) ).toEqual(await page.evaluateHandle(() => document.querySelector('.ple-textarea').innerHTML));
  });

  test('counts valid modules and enables publish button', async () => {
    expect( await page.evaluate(() => editor.titleModule.el.find('input')[0].value) ).toBe("");
    expect( await page.evaluate(() => editor.titleModule.valid()) ).toBe(false);

    expect( await page.evaluate(() => editor.validate()) ).toBe(false);

    await page.evaluate(() => editor.richTextModule.wysiwyg.setMode('markdown')); // set editor mode to markdown
    await page.evaluate(() => editor.richTextModule.value("")); // empty editor content on
    expect( await page.evaluate(() => editor.richTextModule.valid()) ).toBe(false);

    await page.evaluate(() => editor.titleModule.value("My Title")); // set sample title
    await page.evaluate(() => editor.richTextModule.value("My Content")); // set sample content
    expect( await page.evaluate(() => editor.validate()) ).toBe(true);
  });

  test('Sends AJAX request on editor.publish()', async () => {
    await page.evaluate(() => editor.options.destination = '/post');
    const spy = jest.fn().mockImplementation(async (options) => {
      await page.evaluate(() => {
        if (options === editor.options.destination) {
          const d = $.Deferred();
          d.resolve(options);
          d.reject(options);
          return d.promise();
        }
      });

      function onPublish(response) {
        expect(response).toBeDefined();
      }

      editor.publish(onPublish);
    });
  });
});
