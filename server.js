const path = require('path')

const puppeteer = require('puppeteer');
const { spawnSync } = require('child_process');
const fs = require('fs');

const express = require('express')

const app = express()
app.use('/img', express.static(path.join(__dirname, 'img')));

const timeoutTime = 60000
const chartSelector = '#highcharts-0'

let browser, page;
app.get('/btc_usd', async (req, res) => {
  try {
    browser = await createBrowser(browser)
    page = await createPage(page, browser)

    const currencyRate = await getCurrentBtcToUsd(page, 'https://jp.investing.com/currencies/btc-usd', 'last_last')
    await page.waitForSelector(chartSelector, { timeout: 60000 })
    const elementHandle = await page.$(chartSelector, e => e);
  
    await elementHandle.screenshot({
      path: 'img/chart.png'
    })
    res.header('Access-Control-Allow-Origin', '*')
    res.send(currencyRate)
  } catch (err) {
    await closeBrowser(browser)
    console.error(err)
  }
})

const closeBrowser = (browser) => {
  if (browser != null) browser.close()
  browser = null
}

const createBrowser = async (browser) => {
  try {
    return (browser == null)
      ? await puppeteer.launch({
        timeout: timeoutTime
      })
      : await browser
  } catch (err) {
    throw new Error(err)
  }
}

const createPage = async (page, browser) => {
  try {
    return (page == null)
    ? await browser.newPage()
    : await page
  } catch (err) {
    throw new Error(err)
  }
}

const getCurrentBtcToUsd = async (page, url, id) => {
  try {
    let _ = await page.goto(url, {
      timeout: timeoutTime
    });
    return await page.$eval(`#${id}`, el => el.innerText)
  } catch (err) {
    throw new Error(err)
  }
};

app.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

const server = require('http').createServer(app)
server.listen(3000, () => {
  console.log('run server')
})