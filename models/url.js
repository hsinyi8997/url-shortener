const mongoose = require('mongoose')
const Schema = mongoose.Schema

const urlSchema = new Schema({
  originalURL: {
    type: String,
    require: true
  },
  shortURL: {
    type: String,
    require: true
  }
})

module.exports = mongoose.model('Url', urlSchema)