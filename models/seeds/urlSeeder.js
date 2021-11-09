const mongoose = require('mongoose')
const Url = require('../url')
const datas = require('../../test-url.json')
const generateRandomIndex = require('../../generateRandomIndex')
mongoose.connect('mongodb://localhost/url-list')
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  datas.forEach(data => {
    const shortCode = generateRandomIndex()
    Url.create = ({
      originalURL: data,
      shortURL: `http://localhost/${shortCode}`,
      shortCode
    })
  })
  console.log('done')
})