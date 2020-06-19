module.exports = {
    launch: {
        headless: process.env.HEADLESS !== 'false',
        args: ['--no-sandbox'],
        slowMo: process.env.SLOWMO ? process.env.SLOWMO : 0,
        devtools: true
    }
}
