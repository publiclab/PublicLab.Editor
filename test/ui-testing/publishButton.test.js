const timeout = process.env.SLOWMO ? 60000 : 10000;
const fs = require('fs');
beforeAll(async () => {
  path = fs.realpathSync('file://../examples/index.html');
  await page.goto('file://' + path, {waitUntil: 'domcontentloaded'});
});

describe('Publish button', () => {
  
  
    
  test('publish button gets enabled', () => {
     // Check initially that Publish button is disabled.
     expect($('.ple-publish').prop('disabled')).toBe(true);
     // Add title.
     $('.ple-module-title input').val('A title');
     $('.ple-module-title input').keydown();
     // Check final state of Publish button.
     expect($('.ple-publish').prop('disabled')).toBe(false);
    }, timeout);
     
   });
  
    
  
