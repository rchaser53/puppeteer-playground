const puppeteer = require('puppeteer');

const getAllJpegInPage = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  let _ = await page.goto(url);

  await page.waitForSelector('.highcharts-container');
  const elementHandle = await page.$('.highcharts-container', e => e);

  await elementHandle.screenshot({
    path: 'nyan.png'
  })

  browser.close();  
};

getAllJpegInPage('https://jp.investing.com/currencies/btc-usd');