const puppeteer = require('puppeteer');

(async () => {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  let _ = await page.goto('http://marukome.sblo.jp/');

  const img = await page.$eval('.text>img', e => e.src);

  browser.close();  
})();