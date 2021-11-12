const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-Parser')
require('./config/mongoose')
const app = express()
const PORT = process.env.PORT || 3000
const routes = require('./routes')

app.engine('hbs', exphbs({ defaultLayout:'main', extname:'.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(routes)


app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})