const puppeteer = require('puppeteer');

const getJpegInPage = async (url) => {
  try {
    const browser = await puppeteer.launch({
              args: [
                  '--no-sandbox',
                  '--disable-setuid-sandbox',
                  // debug logging
                  '--enable-logging', '--v=1'
              ]
          });
    const page = await browser.newPage();
    let _ = await page.goto(url);

    const texts = await page.$eval('#last_last', (e) => {
      return e.innerText
    });
    console.log(texts)

    const handle = await page.$('#last_last', (e) => {
      return e
    });
    await handle.screenshot({
      path: './img/last_last.jpg',
      quality: 30
    })

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

getJpegInPage('https://jp.investing.com/currencies/btc-usd')
  .then((ret) => {
    console.log('success')
    process.exit();
  })
  .catch((err) => {
    console.error(err)
  })