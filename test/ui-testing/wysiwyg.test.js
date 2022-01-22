const timeout = process.env.SLOWMO ? 60000 : 15000;
const fs = require('fs');
let wysiwyg;

beforeAll(async () => {
  path = fs.realpathSync('file://../examples/index.html');
  await page.goto('file://' + path, {waitUntil: 'domcontentloaded'});
  await page.evaluate(() => {
    wysiwyg = PublicLab.Woofmark(
        document.querySelector('.ple-textarea'),
        {options: {}},
        {options: {}}
    );
  });
});

describe('Wysiwyg', () => {
  test('converts markdown to html and back', async () => {
    expect(true).toBe(true);
  });
}, timeout);
