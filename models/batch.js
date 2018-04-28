let mongoose = require('mongoose');

// Batch Schema
let batchSchema = mongoose.Schema({
  batch_name: { type: String, required: true },
  batch_timestamp: { type: Date, required: true },
  balance: { type: Number, required: true },
  for_investor1234_per: { type: Number, required: true },
  for_investor1234_amount: { type: Number, required: true },
  for_alice123_per: { type: Number, required: true },
  for_alice123_amount: { type: Number, required: true },
  for_fees_per: { type: Number, required: true },
  for_fees_amount: { type: Number, required: true },
  distribution_amount: { type: Number, required: true },
  payment_date: { type: Date, required: true },
  holders_count: { type: Number, required: true },
  user_id: { type: String, required: true }
});

let Batch = module.exports = mongoose.model('Batch', batchSchema);


