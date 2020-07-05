const mongoose = require('mongoose');

const recordsSchema = mongoose.Schema({
  key: {
    type: String
  },
  value: {
    type: String
  },
  createdAt: {
    type: Date
  },
  counts: [
    {
      type: Number
    }
  ]
});

module.exports = mongoose.model('records', recordsSchema);
