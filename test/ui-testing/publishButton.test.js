const timeout = process.env.SLOWMO ? 60000 : 10000;
const fs = require('fs');
beforeAll(async () => {
  path = fs.realpathSync('file://../examples/index.html');
  await page.goto('file://' + path, {waitUntil: 'domcontentloaded'});
  await page.waitForSelector('body');
  await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'});
});

describe('Publish button', () => {
  test('publish button gets enabled', () => {
    // Check initially that Publish button is disabled.
    expect(page.$('.ple-publish').getAttribute('disabled')).toBe(true);
    // Add title.
    page.$('.ple-module-title input').innerText.toBe('Title');
    page.type('.ple-module-title input', 'hello');
    // Check final state of Publish button.
    expect(page.$('.ple-publish').getAttribute('disabled')).toBe(false);
  }, timeout);
});
