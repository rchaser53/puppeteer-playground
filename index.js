const puppeteer = require('puppeteer');
const { spawnSync } = require('child_process');
const fs = require('fs');

(async () => {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  let _ = await page.goto('http://marukome.sblo.jp/');

  const imgSrc = await page.$eval('.text>img', e => e.src);

  spawnSync('curl', [imgSrc, '-o', 'hoge.jpg']);

  browser.close();  
})();