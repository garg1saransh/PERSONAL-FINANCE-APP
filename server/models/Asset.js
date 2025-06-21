const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  type: { type: String, required: true },       // stock, mutual fund, FD, etc.
  name: { type: String, required: true },
  amountInvested: { type: Number, required: true },
  currentValue: { type: Number, required: true },
  purchaseDate: { type: Date, required: true },
  metadata: { type: Object },                  // extra data like units, interest, etc.
}, { timestamps: true });

module.exports = mongoose.model('Asset', assetSchema);
