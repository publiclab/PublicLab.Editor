const timeout = process.env.SLOWMO ? 60000 : 10000;
const fs = require('fs');

beforeAll(async () => {
  path = fs.realpathSync('file://../examples/index.html');
  await page.goto('file://' + path, {waitUntil: 'domcontentloaded'});
});

describe('Custom Insert text', () => {
  test('Add Custom Insert text in rich text mode', async () => {
    try {
      if (await page.evaluate(() => $(".woofmark-mode-markdown").is(":disabled"))) {
        await page.click('.woofmark-mode-wysiwyg');
      }
      await page.waitForSelector('.ple-module-body');
      // Click on insert text button
      await page.click('.woofmark-command-insert');
      // Select the option 'Nodes' from Menu: What Do you want to insert?
      await page.waitForSelector('.dropdownMenu1');
      await page.click('.dropdownMenu1');
      await page.waitForSelector('.Nodes');
      await page.click('.Nodes');
      // Select the option 'List' from Menu: Insert as a?
      await page.waitForSelector('.dropdownMenu2');
      await page.click('.dropdownMenu2');
      await page.waitForSelector('.List');
      await page.click('.List');
      // Add input tag
      await page.$eval('.inputText', (el) => el.value = 'tag');
      // Press the Go! button
      await page.click('.go1');
      await page.click('.woofmark-command-insert');
      // Evaluate the expression
      await page.waitForSelector('.powertags');
      const stringIsIncluded = await page.evaluate(() => document.querySelector('.wk-wysiwyg').textContent.includes("Power tag: nodes:tag"));
      expect(stringIsIncluded).toBe(true);

      await page.waitForSelector('.woofmark-mode-markdown');
      await page.click('.woofmark-mode-markdown');
      await page.screenshot({path: 'buddy-screenshot1.png', fullPage: true});
      await page.waitForSelector('.ple-module-body');
      // await page.evaluate(() => document.querySelector('.ple-textarea').value += ' ');
      // Click on insert text button
      await page.click('.woofmark-command-insert');
      // Select the option 'Notes' from Menu: What Do you want to insert?
      await page.waitForSelector('.dropdownMenu1');
      await page.click('.dropdownMenu1');
      await page.screenshot({path: 'buddy-screenshot11.png', fullPage: true});
      await page.waitForSelector('.Notes');
      await page.screenshot({path: 'buddy-screenshot2.png', fullPage: true});
      await page.click('.Notes');
      await page.screenshot({path: 'buddy-screenshot3.png'});
      // Select the option 'List' from Menu: Insert as a?
      await page.waitForSelector('.dropdownMenu2');
      await page.click('.dropdownMenu2');
      await page.waitForSelector('.List');
      await page.click('.List');
      await page.screenshot({path: 'buddy-screenshot4.png'});
      // Add input tag
      await page.$eval('.inputText', (el) => el.value = 'tag');
      // Press the Go! button
      await page.click('.go1');
      await page.click('.woofmark-command-insert');
      // Evaluate the expression
      const stringIsIncluded2 = await page.evaluate(() => document.querySelector('.ple-textarea').value.includes('[notes:tag]'));
      expect(stringIsIncluded2).toBe(true);
      await page.click('.woofmark-mode-wysiwyg');
    } catch (err) {
      // console.log(err);
    }
  }, timeout);
});
