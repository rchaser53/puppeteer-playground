const path = require('path')

const puppeteer = require('puppeteer');
const { spawnSync } = require('child_process');
const fs = require('fs');

const express = require('express')

const app = express()
const server = require('http').createServer(app)

let browser, page;
app.get('/btc_usd', async (req, res) => {
  try {
    browser = await createBrowser(browser)
    page = await createPage(page, browser)

    const currencyRate = await getCurrentBtcToUsd(page, 'https://jp.investing.com/currencies/btc-usd', 'last_last')

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
      ? await puppeteer.launch()
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
      timeout: 500000
    });
    const elementHandle = await page.$(`#${id}`, e => e);
    return await Promise.resolve(elementHandle.evaluate((e => e.innerText)))
  } catch (err) {
    throw new Error(err)
  }
};

app.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

server.listen(3000, () => {
  console.log('run server')
})