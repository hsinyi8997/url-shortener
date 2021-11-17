const express = require('express')
const router = express.Router()
const urlList = require('../../models/url')
const generateRandomIndex = require('../../generateRandomIndex')

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', (req, res) => {
  const host = req.headers.host
  const inputURL = req.body.originalURL.trim()
  if (inputURL) {
    urlList.find()
      .lean()
      .then(urls => {
        const addedURL = urls.find(url => url.originalURL === inputURL)
        if (addedURL) {
          res.render('result', { newURL: addedURL.shortURL, shortCode: addedURL.shortCode })
        } else {
          let shortCode = generateRandomIndex()
          while (urls.some(url => url.shortCode === shortCode)) {
            shortCode = generateRandomIndex()
          }
          urlList.create({
            originalURL: inputURL,
            shortURL: host + '/' + shortCode,
            shortCode
          })
          res.render('result', { newURL: host + '/' + shortCode, shortCode })
        }
      })
      .catch(error => console.log(error))
  } else {
    res.redirect('/')
  }
})

router.get('/:code', (req, res) => {
  const code = req.params.code
  urlList.findOne({ shortCode: code })
    .lean()
    .then(urlData => {
      res.status(301).redirect(urlData.originalURL)
    })
    .catch(() => { res.sendStatus(404) })
})

module.exports = router