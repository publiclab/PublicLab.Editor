const timeout = process.env.SLOWMO ? 60000 : 10000;
const fs = require('fs');

describe('Publish button', () => {
  var $;
  beforeAll(async () => {
    path = fs.realpathSync('file://../examples/index.html');
    await page.goto('file://' + path, {waitUntil: 'domcontentloaded'});

    const {JSDOM} = require("jsdom");
    const myJSDom = new JSDOM(fs.readFileSync(path));
    $ = require('jquery')(myJSDom.window);
  });

  test('something we are testing described here', () => {
    // Check initially that Publish button is disabled.
    expect($('.ple-publish').prop('disabled')).toBe(true);
    // Add title.
    $('.ple-module-title input').val('A title');
    $('.ple-module-title input').keydown();
    // Check final state of Publish button.
    expect($('.ple-publish').prop('disabled')).toBe(false);
  });
}, timeout);
