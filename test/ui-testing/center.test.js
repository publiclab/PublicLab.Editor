const timeout = process.env.SLOWMO ? 60000 : 10000;
const fs = require('fs');
beforeAll(async () => {
  path = fs.realpathSync('file://../examples/index.html');
  await page.goto('file://' + path, {waitUntil: 'domcontentloaded'});
});

describe('Heading Text', () => {
  test('Adding and switching between headings', async () => {
    await page.click('.woofmark-mode-markdown');
    await page.waitForSelector('.ple-module-body');
    
    await page.click('.woofmark-command-autocenter');
    const stringIsIncluded = await page.evaluate(() => document.querySelector('.ple-textarea').value.includes('#Heading Text'));
    expect(stringIsIncluded).toBe(true);
    await page.click('.woofmark-command-autocenter');
    const stringIsIncluded = await page.evaluate(() => document.querySelector('.ple-textarea').value.includes('##Heading Text'));
    expect(stringIsIncluded).toBe(true);
    await page.click('.woofmark-command-autocenter');
    const stringIsIncluded = await page.evaluate(() => document.querySelector('.ple-textarea').value.includes('###Heading Text'));
    expect(stringIsIncluded).toBe(true);
    await page.click('.woofmark-command-autocenter');
    const stringIsIncluded = await page.evaluate(() => document.querySelector('.ple-textarea').value.includes('####Heading Text'));
    expect(stringIsIncluded).toBe(true);
    await page.click('.woofmark-command-autocenter');
    const stringIsIncluded = await page.evaluate(() => document.querySelector('.ple-textarea').value.includes('Heading Text'));
    expect(stringIsIncluded).toBe(true);

  }, timeout);
});