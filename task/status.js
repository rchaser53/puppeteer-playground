const puppeteer = require('puppeteer');

const getPageStatus = async (url) => {
  try {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  let _ = await page.goto(url);

  const cookies = await page.cookies(url)
  console.log(cookies)

  const frames = await page.frames(url)
  console.log(frames)

  browser.close();
  } catch (err) {
    console.error(err)
  }
};

getPageStatus('https://jp.investing.com/currencies/btc-usd')
