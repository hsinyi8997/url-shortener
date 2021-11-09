const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-Parser')
const generateRandomIndex = require('./generateRandomIndex')
const urlList = require('./models/url')
const mainURL = 'http://localhost/'
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

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const inputURL = req.body.originalURL
  urlList.find()
    .lean()
    .then(urls => {
      addedURL = urls.find(url => url.originalURL === inputURL)
      if (addedURL) {
        res.render('result', { newURL: addedURL.shortURL})
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
        res.render('result', { newURL: mainURL + shortCode})
      }
    })
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})