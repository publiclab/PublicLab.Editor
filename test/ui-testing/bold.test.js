const timeout = process.env.SLOWMO ? 60000 : 10000;
const fs = require('fs');
beforeAll(async () => {
  path = fs.realpathSync('file://../examples/index.html');
  await page.goto('file://' + path, {waitUntil: 'domcontentloaded'});
});

describe('Bold Text', () => {
  test('Adds strong text in rich text mode', async () => {
    // switches to wysiwyg mode if it is in markdown mode
    if(await page.evaluate(() => $(".woofmark-mode-markdown").is(":disabled")))
      await page.click('.woofmark-mode-wysiwyg');
      
    // clicks on bold button and checks if 'strong text' is added in the editor
    await page.waitForSelector('.ple-module-body');
    await page.click('.woofmark-command-bold');
    const stringIsIncluded = await page.evaluate(() => document.querySelector('.wk-wysiwyg').textContent.includes('strong text'));
    expect(stringIsIncluded).toBe(true);

    // resets the changes by removing the added text
    await page.keyboard.press("Backspace");
  }, timeout);

  test('Adds strong text in markdown mode', async () => {
    // clicks on bold button and checks if '**strong text**' is added in the editor
    await page.waitForSelector('.woofmark-mode-markdown');
    await page.click('.woofmark-mode-markdown');
    await page.evaluate(() => document.querySelector('.ple-textarea').value += ' ');
    await page.click('.woofmark-command-bold');
    let stringIsIncluded = await page.evaluate(() => document.querySelector('.ple-textarea').value.includes('**strong text**'));
    expect(stringIsIncluded).toBe(true);

    // clicks bold button again to un-bolden the text but retains the text value 'strong text'
    await page.click('.woofmark-command-bold');
    stringIsIncluded = await page.evaluate(() => document.querySelector('.ple-textarea').value.includes('strong text'));
    expect(stringIsIncluded).toBe(true);
    stringIsIncluded = await page.evaluate(() => document.querySelector('.ple-textarea').value.includes('**strong text**'));
    expect(stringIsIncluded).toBe(false);

    // resets changes by removing the added text and changes back to wysiwyg mode
    await page.keyboard.press("Backspace");
    await page.click('.woofmark-mode-wysiwyg');
  }, timeout);
});
