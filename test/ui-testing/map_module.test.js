const timeout = process.env.SLOWMO ? 60000 : 10000;
const fs = require('fs');
let _module;

beforeAll(async () => {
  path = fs.realpathSync('file://../examples/index.html');
  await page.goto('file://' + path, {waitUntil: 'domcontentloaded'});
  await page.evaluateHandle(() => _module = editor.mapModule);
});

describe('MapModule', () => {
  test('reports key, value, valid', async () => {
    expect(await page.evaluateHandle(() => _module)).toBeDefined();
    expect(await page.evaluate(() => _module.key)).toBe('map_data');

    expect(await page.evaluate(() => _module.options.name)).toBe('map');
    expect(await page.evaluate(() => _module.options.required)).toBe(false);

    expect(await page.evaluate(() => _module.valid())).toBe(true);
  });
}, timeout);
