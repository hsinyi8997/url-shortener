const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/url-list'
const mongoose = require('mongoose')
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db