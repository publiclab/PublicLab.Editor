const timeout = process.env.SLOWMO ? 60000 : 10000;
const fs = require('fs');
beforeAll(async () => {
  path = fs.realpathSync('file://../examples/index.html');
  await page.goto('file://' + path, {waitUntil: 'domcontentloaded'});
  await page.setDefaultNavigationTimeout(60000);
});

describe('Italic Text', () => {
  test('Adds emphasized text in rich text mode', async () => {
    // switches to wysiwyg mode if it is in markdown mode
    if (await page.evaluate(() => $(".woofmark-mode-markdown").is(":disabled"))) {
      await page.click('.woofmark-mode-wysiwyg');
    }
    // clicks on italic button and checks if 'emphasized text' is added in the editor
    await page.waitForSelector('.ple-module-body');
    await page.keyboard.press('Backspace');
    await page.click('.woofmark-command-italic');
    const stringIsIncluded = await page.evaluate(() => document.querySelector('.wk-wysiwyg').textContent.includes('emphasized text'));
    expect(stringIsIncluded).toBe(true);

    // resets the changes by removing the added text
    await page.keyboard.press("Backspace");
  }, timeout);

  test('Adds emphasized text in markdown mode', async () => {
    // clicks on italic button and checks if '*emphasized text*' is added in the editor
    await page.waitForSelector('.woofmark-mode-markdown');
    await page.click('.woofmark-mode-markdown');
    await page.evaluate(() => document.querySelector('.ple-textarea').value += ' ');
    await page.click('.woofmark-command-italic');
    let stringIsIncluded = await page.evaluate(() => document.querySelector('.ple-textarea').value.includes('*emphasized text*'));
    expect(stringIsIncluded).toBe(true);

    // clicks italic button again to un-emphasize the text but retains the text value 'emphasized text'
    await page.click('.woofmark-command-italic');
    stringIsIncluded = await page.evaluate(() => document.querySelector('.ple-textarea').value.includes('emphasized text'));
    expect(stringIsIncluded).toBe(true);
    stringIsIncluded = await page.evaluate(() => document.querySelector('.ple-textarea').value.includes('*emphasized text*'));
    expect(stringIsIncluded).toBe(false);

    // resets changes by removing the added text and changes back to wysiwyg mode
    await page.keyboard.press("Backspace");
    await page.click('.woofmark-mode-wysiwyg');
  }, timeout);
});
