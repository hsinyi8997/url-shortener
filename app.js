const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-Parser')

const app = express()
const port = 3000
const routes = require('./routes')


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
app.use(routes)


app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})