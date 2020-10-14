const timeout = process.env.SLOWMO ? 60000 : 10000;
const fs = require('fs');
var editor;

beforeAll(async () => {
  path = fs.realpathSync('file://../examples/index.html');
  await page.goto('file://' + path, {waitUntil: 'domcontentloaded'});

  editor = new PL.Editor({
    textarea: $('.ple-textarea')[0]
  });
});

describe("Publish button", function() {
  test("Publish button is enabled", function() {
    // Check initially that Publish button is disabled.
    expect($('.ple-publish').prop('disabled')).toBe(true);
    // Add title.
    $('.ple-module-title input').val('A title');
    $('.ple-module-title input').keydown();
    // Check final state of Publish button.
    expect($('.ple-publish').prop('disabled')).toBe(false);
  });
});
