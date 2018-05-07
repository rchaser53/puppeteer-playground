const puppeteer = require('puppeteer');
const { spawnSync } = require('child_process');
const fs = require('fs');

const getImages = async (src, index) => {
  return spawnSync('curl', [src, '-o', `${index}.jpg`])
}

const getAllJpegInPage = async (url) => {
  try {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  let _ = await page.goto(url);

  const texts = await page.$eval('#last_last', (e) => {
    return e.innerText
  });

  console.log(texts)

  await page.screenshot({
    path: './img/overAll.jpg',
    quality: 30,
    fullPage: true
  });

  browser.close();
  } catch (err) {
    console.error(err)
  }
};

getAllJpegInPage('https://jp.investing.com/currencies/btc-usd');