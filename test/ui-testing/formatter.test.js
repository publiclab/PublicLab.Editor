const timeout = process.env.SLOWMO ? 60000 : 10000;
const fs = require('fs');
let formatted;
beforeAll(async () => {
  path = fs.realpathSync('file://../examples/index.html');
  await page.goto('file://' + path, {waitUntil: 'domcontentloaded'});
  await page.evaluate(() => {
    formatted = new PL.Formatter().convert({
      title: 'My title',
      body: 'My body'
    }, 'publiclab');
  });
});

describe('Formatter', () => {
  test('converts basic post data into a given format', async () => {
    expect(await page.evaluate(() => formatted)).toBeDefined();
    expect(await page.evaluate(() => formatted.title)).toBeDefined();
    expect(await page.evaluate(() => formatted.body)).toBeDefined();
  });
}, timeout);
