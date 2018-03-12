var mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/admin')

var userSchema = new mongoose.Schema({
  name: String,
  password: String
})

var articleSchema = new mongoose.Schema({
  title: String,
  date: String,
  content: String,
  gist: String,
  labels: Array
})

var Models = {
  User: mongoose.model('User', userSchema),
  Article: mongoose.model('Article', articleSchema)
}

module.exports = Models
