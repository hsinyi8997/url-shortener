const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-Parser')
require('./config/mongoose')
const app = express()
const port = process.env.port || 3000
const routes = require('./routes')

app.engine('hbs', exphbs({ defaultLayout:'main', extname:'.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(routes)


app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})