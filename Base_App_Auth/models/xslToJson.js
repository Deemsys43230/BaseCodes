var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Items
var Jsonconversion = new Schema({
  bookid: {
    type: Number,
    required: [true, 'Bookid is required.. Check your file if any cell is empty']
  },
  booktitle: {
    type: String,
    required: [true, 'Book Title is required.. Check your file if any cell is empty']
  },
  bookauthor: {
    type: String,
    required: [true, 'Book Author is required.. Check your file if any cell is empty']
  }
},{
    collection: 'jsonconversion'
});

module.exports = mongoose.model('Jsonconversion', Jsonconversion);