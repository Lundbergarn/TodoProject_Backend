const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ListSchema = new Schema({
  title: {
    type: String,
    required: true
  }
});

module.exports = List = mongoose.model('list', ListSchema);
