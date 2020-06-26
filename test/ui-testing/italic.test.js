const timeout = process.env.SLOWMO ? 60000 : 10000;
const fs = require('fs');
beforeAll(async () => {
  path = fs.realpathSync('file://../examples/index.html');
  await page.goto('file://' + path, {waitUntil: 'domcontentloaded'});
});

describe('Italic Text', () => {
  test('Adds emphasized text in rich text mode', async () => {
    await page.waitForSelector('.ple-module-body');
    await page.click('.woofmark-command-italic');
    const stringIsIncluded = await page.evaluate(() => document.querySelector('.wk-wysiwyg').textContent.includes('emphasized text'));
  
    expect(stringIsIncluded).toBe(true);

  }, timeout);

  test('Adds emphasized text in markdown mode', async () => {
    await page.click('.woofmark-mode-markdown');
    await page.waitForSelector('.ple-module-body');
    await page.focus('.ple-module-body');
    await page.click('.woofmark-command-italic');
    const stringIsIncluded = await page.evaluate(() => document.querySelector('.ple-textarea').value.includes('_emphasized text_'));
  
    expect(stringIsIncluded).toBe(true);

  }, timeout);

});
