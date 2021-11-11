const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-Parser')
const generateRandomIndex = require('./generateRandomIndex')
const urlList = require('./models/url')
const mainURL = 'http://localhost:3000/'
const app = express()
const port = 3000

mongoose.connect('mongodb://localhost/url-list')
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout:'main', extname:'.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const inputURL = req.body.originalURL.trim()
  if (inputURL) {
    urlList.find()
      .lean()
      .then(urls => {
        addedURL = urls.find(url => url.originalURL === inputURL)
        if (addedURL) {
          res.render('result', { newURL: addedURL.shortURL, shortCode: addedURL.shortCode })
        } else {
          let shortCode = generateRandomIndex()
          while (urls.some(url => url.shortCode === shortCode)) {
            shortCode = generateRandomIndex()
          }
          urlList.create({
            originalURL: inputURL,
            shortURL: mainURL + shortCode,
            shortCode
          })
          res.render('result', { newURL: mainURL + shortCode, shortCode })
        }
      })
      .catch(error => console.log(error))
  } else {
    res.redirect('/')
  }
})

app.get('/:code', (req, res) => {
  const code = req.params.code
  urlList.findOne({ shortCode: code})
    .lean()
    .then(urlData => {
      res.status(301).res.redirect(urlData.originalURL)
    })
    .catch(() => { res.sendStatus(404) })
})

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})