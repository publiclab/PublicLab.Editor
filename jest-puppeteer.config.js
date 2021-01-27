module.exports = {
  launch: {
    headless: process.env.HEADLESS !== 'false',
    slowMo: process.env.SLOWMO ? process.env.SLOWMO : 0,
    args: ['--no-sandbox', '--disable-setuid-sandbox'], // https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md#setting-up-chrome-linux-sandbox
    devtools: true
  },

  server: {
    command: 'http-server',
    port: 8080
  },
};
