const timeout = process.env.SLOWMO ? 60000 : 10000;
const fs = require('fs');
beforeAll(async () => {
  path = fs.realpathSync('file://../examples/index.html');
  await page.goto('file://' + path, {waitUntil: 'domcontentloaded'});
});

describe('Publish button', () => {
  
  test('Publish button is enabled', async () => {
    // Check initially that Publish button is disabled.    
    expect(await page.evaluate(() => document.querySelector('.ple-publish').disabled)).toBe(true);
    // Add title.
    await page.evaluate(() => {
      document.querySelector('.ple-module-title input').value = 'A title';
      document.querySelector('.ple-module-title input').dispatchEvent(new KeyboardEvent('keydown', { "code": "9" })); // random key
    });
    // Check final state of Publish button.
    expect(await page.evaluate(() => document.querySelector('.ple-publish').disabled)).toBe(false);
  });

});
