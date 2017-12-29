const path = require('path')
const express = require('express')

const app = express()
const server = require('http').createServer(app)

// app.use('/css', express.static(path.join(__dirname, 'css')));

// app.get('/tabledata', async (req, res) => {
//   try {
//     res.header('Access-Control-Allow-Origin', '*')
//     res.send(JSON.stringify(fakeData))
//   } catch (err) {
//     console.error(err)
//   }
// })

app.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

server.listen(3000, () => {
  console.log('run server')
})