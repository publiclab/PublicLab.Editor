const timeout = process.env.SLOWMO ? 60000 : 10000;
const fs = require('fs');
beforeAll(async () => {
  path = fs.realpathSync('file://../examples/index.html');
  await page.goto('file://' + path, {waitUntil: 'domcontentloaded'});
});

describe('Bold Text', () => {
  test('Adds strong text in rich text mode', async () => {
    await page.waitForSelector('.ple-module-body');
    await page.click('.woofmark-command-bold');
    const stringIsIncluded = await page.evaluate(() => document.querySelector('.wk-wysiwyg').textContent.includes('strong text'));
  
    expect(stringIsIncluded).toBe(true);

  }, timeout);

  test('Adds strong text in markdown mode', async () => {
    await page.click('.woofmark-mode-markdown');
    await page.waitForSelector('.ple-module-body');
    await page.focus('.ple-module-body');
    await page.click('.woofmark-command-bold');
    const stringIsIncluded = await page.evaluate(() => document.querySelector('.ple-textarea').value.includes('**strong text**'));
  
    expect(stringIsIncluded).toBe(true);

  }, timeout);
});
