const timeout = process.env.SLOWMO ? 60000 : 10000;
const fs = require('fs');
beforeAll(async () => {
	path = fs.realpathSync('file://../examples/index.html');
	await page.goto('file://' + path, {waitUntil: 'domcontentloaded'});
});

describe('Custom Insert Map', () => {
	test('Add Custom Insert Map in rich text mode', async () => {
	await page.waitForSelector('.ple-module-body');
	// Click on insert Map button
	await page.click('.woofmark-command-insert-map');
	// Input Latitude value
	await page.waitForSelector('#Latitude');
	await page.$eval('#Latitude', el => el.value = 50);	
	//Input Longitude value
	await page.click('#Longitude');
	await page.$eval('#Longitude', el => el.value = 25);
	// Input layers value
	await page.click('#layer');
	await page.$eval('#layer', el => el.value = 'layer1,layer2');
	//Press the submit button
	await page.click('#submit');
	await page.click('.woofmark-command-insert-map');
	//Evaluate the expression
	await page.waitForSelector('.powertags');
	const stringIsIncluded = await page.evaluate(() => document.querySelector('.wk-wysiwyg').textContent.includes("Power tag: map:content:50:25:layer1,layer2"));
	expect(stringIsIncluded).toBe(true);
}, timeout);
})

describe('Custom Insert Map', () => {
	test('Custpm Insert Map in Mardown mode', async () => {
	await page.waitForSelector('.ple-module-body');
	// Click on Mardown mode button
	await page.waitForSelector('.woofmark-mode-markdown');
	await page.click('.woofmark-mode-markdown');
	await page.evaluate(() => document.querySelector('.ple-textarea').value += ' ');
	// Click on insert Map button
	await page.click('.woofmark-command-insert-map');
	// Input Latitude value
	await page.waitForSelector('#Latitude');
	await page.$eval('#Latitude', el => el.value = 50);	
	//Input Longitude value
	await page.click('#Longitude');
	await page.$eval('#Longitude', el => el.value = 25);
	// Input layers value
	await page.click('#layer');
	await page.$eval('#layer', el => el.value = 'layer1,layer2');
	//Press the submit button
	await page.click('#submit');
	await page.click('.woofmark-command-insert-map');
	//Evaluate the expression
	let stringIsIncluded = await page.evaluate(() => document.querySelector('.ple-textarea').value.includes('[map:content:50:25:layer1,layer2]'));
	expect(stringIsIncluded).toBe(true);
}, timeout);
});