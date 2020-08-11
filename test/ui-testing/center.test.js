const timeout = process.env.SLOWMO ? 60000 : 10000;
const fs = require('fs');
beforeAll(async () => {
  path = fs.realpathSync('file://../examples/index.html');
  await page.goto('file://' + path, {waitUntil: 'domcontentloaded'});
});

describe('Center Text', () => {
  test('Centering and decentering text', async () => {
    // selects a string from textarea in md mode
    await page.setViewport({width: 1920, height: 1080});
    await page.waitForSelector('.ple-module-body');
    await page.click('.woofmark-mode-markdown');
    await page.focus('.ple-textarea');

    // center aligns the string and checks for presence of '->' and '<-'
    await page.click('.woofmark-command-autocenter');
    let opening = await page.evaluate(() => document.querySelector('.ple-textarea').value.includes('->'));
    let closing = await page.evaluate(() => document.querySelector('.ple-textarea').value.includes('<-'));
    expect(opening).toBe(true);
    expect(closing).toBe(true);

    // the selection changes from '-> some text <-' to ->'some text'<-
    await page.click('.woofmark-command-autocenter');
    // clicking again removes the center alignment and tests for absence of '->' and '<-'
    await page.click('.woofmark-command-autocenter');
    opening = await page.evaluate(() => document.querySelector('.ple-textarea').value.includes('->'));
    closing = await page.evaluate(() => document.querySelector('.ple-textarea').value.includes('<-'));
    expect(opening).toBe(false);
    expect(closing).toBe(false);
    await page.click('.woofmark-mode-wysiwyg');
  }, timeout);
});
