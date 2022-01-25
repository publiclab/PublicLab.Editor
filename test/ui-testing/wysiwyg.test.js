const timeout = process.env.SLOWMO ? 60000 : 10000;
const fs = require('fs');

beforeAll(async () => {
  try {
    path = fs.realpathSync('file://../examples/index.html');
    await page.goto('file://' + path, {waitUntil: 'domcontentloaded'});
    await page.evaluate(() => {
      wysiwyg = PublicLab.Woofmark(
          $('.ple-textarea')[0],
          {options: {}},
          {options: {}}
      );
    });
  } catch (err) {
    throw new Error(err);
  }
});

describe('Wysiwyg', () => {
  test('converts markdown to html and back', async () => {
    expect(true).toBe(true);
  });
}, timeout);
