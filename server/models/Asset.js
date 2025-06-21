// models/Asset.js
const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  type: String,
  name: String,
  value: Number,
  date: Date,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Asset', assetSchema);
