const puppeteer = require('puppeteer');
const { spawnSync } = require('child_process');
const fs = require('fs');

const getImages = async (src, index) => {
  return spawnSync('curl', [src, '-o', `${index}.jpg`])
}

const getAllJpegInPage = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  let _ = await page.goto(url);

  const texts = await page.$eval('#last_last', e => {
    return e.innerText
  });

  console.log(texts)

  browser.close();  
};

getAllJpegInPage('https://jp.investing.com/currencies/btc-usd');