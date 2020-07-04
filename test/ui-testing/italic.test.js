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
    await page.keyboard.press("Backspace");

  }, timeout);

  test('Adds emphasized text in markdown mode', async () => {
    await page.waitForSelector('.woofmark-mode-markdown');
    await page.click('.woofmark-mode-markdown');
    await page.evaluate(() => document.querySelector('.ple-textarea').value += ' ');
    await page.click('.woofmark-command-italic');
    let stringIsIncluded = await page.evaluate(() => document.querySelector('.ple-textarea').value.includes('*emphasized text*'));
    expect(stringIsIncluded).toBe(true);

    await page.click('.woofmark-command-italic');
    stringIsIncluded = await page.evaluate(() => document.querySelector('.ple-textarea').value.includes('emphasized text'));
    expect(stringIsIncluded).toBe(true);
    stringIsIncluded = await page.evaluate(() => document.querySelector('.ple-textarea').value.includes('*emphasized text*'));
    expect(stringIsIncluded).toBe(false);

    await page.keyboard.press("Backspace");
    await page.click('.woofmark-mode-wysiwyg');

  }, timeout);

});
