const timeout = process.env.SLOWMO ? 60000 : 15000;
const fs = require('fs');
beforeAll(async () => {
  path = fs.realpathSync('file://../examples/index.html');
  await page.goto('file://' + path, {waitUntil: 'domcontentloaded'});
});

describe('History functions', () => {
  test('something we are testing described here', () => {

  });
}, timeout);
