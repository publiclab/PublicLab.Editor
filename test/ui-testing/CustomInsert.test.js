const timeout = process.env.SLOWMO ? 60000 : 10000;
const fs = require('fs');
beforeAll(async () => {
	path = fs.realpathSync('file://../examples/index.html');
	await page.goto('file://' + path, {waitUntil: 'domcontentloaded'});
});

describe('Custom Insert text', () => {
	test('Add Custom Insert text in rich text mode', async () => {
	await page.waitForSelector('.ple-module-body');
	// Click on insert text button
	await page.click('.woofmark-command-insert');
	// Select the option 'Nodes' from Menu: What Do you want to insert?
	await page.waitForSelector('#dropdownMenu1');
	await page.click('#dropdownMenu1');
	await page.waitForSelector('#Nodes');
	await page.click('#Nodes');
	// Select the option 'List' from Menu: Insert as a?
	await page.click('#dropdownMenu2');
	await page.waitForSelector('#List');
	await page.click('#List');
	// Add input tag
	await page.$eval('#inputText', el => el.value = 'tag');
	//Press the Go! button
	await page.click('#go1');
	await page.click('.woofmark-command-insert');
	//Evaluate the expression
	await page.waitForSelector('.powertags');
	const stringIsIncluded = await page.evaluate(() => document.querySelector('.wk-wysiwyg').textContent.includes("Power tag: nodes:tag"));
	expect(stringIsIncluded).toBe(true);
}, timeout);
})

describe('Custom Insert text', () => {
	test('Adds strong text in rich text mode', async () => {
	await page.waitForSelector('.ple-module-body');
	// Click on Mardown mode button
	await page.waitForSelector('.woofmark-mode-markdown');
	await page.click('.woofmark-mode-markdown');
	await page.evaluate(() => document.querySelector('.ple-textarea').value += ' ');
	// Click on insert text button
	await page.click('.woofmark-command-insert');
	// Select the option 'Notes' from Menu: What Do you want to insert?
	await page.waitForSelector('#dropdownMenu1');
	await page.click('#dropdownMenu1');
	await page.waitForSelector('#Notes');
	await page.click('#Notes');
	// Select the option 'List' from Menu: Insert as a?
	await page.click('#dropdownMenu2');
	await page.waitForSelector('#List');
	await page.click('#List');
	// Add input tag
	await page.$eval('#inputText', el => el.value = 'tag');
	//Press the Go! button
	await page.click('#go1');
	await page.click('.woofmark-command-insert');
	//Evaluate the expression
	let stringIsIncluded = await page.evaluate(() => document.querySelector('.ple-textarea').value.includes('[notes:tag]'));
	expect(stringIsIncluded).toBe(true);
}, timeout);
}); 