const path = require('path')

const puppeteer = require('puppeteer');
const { spawnSync } = require('child_process');
const fs = require('fs');

const express = require('express')

const app = express()
const server = require('http').createServer(app)

app.get('/btc_usd', async (req, res) => {
  try {
    res.header('Access-Control-Allow-Origin', '*')
    const currencyRate = await getCurrentBtcToUsd('https://jp.investing.com/currencies/btc-usd', 'last_last');
    res.send(currencyRate)
  } catch (err) {
    console.error(err)
  }
})

const getCurrentBtcToUsd = async (url, id) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  let _ = await page.goto(url);

  const elementHandles = await page.$$(`#${id}`, e => e);

  const srcs = await Promise.all(elementHandles.map((elementHandle) => {
    return elementHandle.evaluate((e => e.innerText));
  }));

  return srcs.pop()
};

app.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

server.listen(3000, () => {
  console.log('run server')
})