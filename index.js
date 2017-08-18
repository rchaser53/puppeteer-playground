const puppeteer = require('puppeteer');

(async () => {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://kaznews.xyz/archives/240');

  const mouse = page.mouse;
  await mouse.move(120, 1000)

  await page.focus('.images-img>img')
  await page.screenshot({
          path: 'example.png',
          fullPage: true
          // clip: {
            // x: 150,
            // y: 1000,
            // width: 1000,
            // height: 1000
          // }
  });

  browser.close();
})();