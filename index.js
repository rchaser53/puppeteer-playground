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

  const elementHandles = await page.$$('img', e => e);

  const srcs = await Promise.all(elementHandles.map((elementHandle) => {
    return elementHandle.evaluate((e => e.src));
  }));

  await Promise.all(
    srcs.filter((src) => {
      return src.includes('.jpg')
    }).map((src, index) => {
      return getImages(src, index);
    })
  )

  browser.close();  
};

getAllJpegInPage('http://marukome.sblo.jp/');