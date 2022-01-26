const timeout = process.env.SLOWMO ? 60000 : 15000;
const fs = require('fs');
beforeAll(async () => {
  path = fs.realpathSync('file://../examples/errors.html');
  await page.goto('file://' + path, {waitUntil: 'domcontentloaded'});
});

describe('Errors', () => {
  test('displays given errors', async () => {
    expect( await page.evaluate(() => document.querySelectorAll('.ple-errors').length)).toBeGreaterThan(0);
    expect( await page.evaluate(() => document.querySelectorAll('.ple-errors .alert').length)).toBe(1);
    expect( await page.evaluate(() => document.querySelectorAll('.ple-errors p').length)).toBe(1);
    expect( await page.evaluate(() => document.querySelector('.ple-errors p').innerText)).toBe("Error: title can't be blank.");
  });

  test("does not display error alert if there are no errors", async () => {
    await page.evaluate(() => document.querySelector('.ple-errors').innerHTML = '');
    expect( await page.evaluate(() => document.querySelectorAll('.ple-errors .alert').length) ).toBe(0);
  });
});
