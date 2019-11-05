const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  list: {
    type: String,
    required: true
  },
  checked: {
    type: Boolean
  }
});

module.exports = Item = mongoose.model('item', ItemSchema);
