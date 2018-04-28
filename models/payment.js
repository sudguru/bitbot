let mongoose = require('mongoose');
// Payment Schema
let paymentSchema = mongoose.Schema({
  batch_id:{
    type: String,
    required: true
  },
  account_id:{
    type: String,
    required: true
  },
  amount:{
    type: Number,
    required: true
  },
  name:{
    type: String,
    required: true
  },
  percent:{
    type: Number,
    required: true
  },
  payment:{
    type: Number,
    required: true
  }
});

let Payment = module.exports = mongoose.model('Payment', paymentSchema, 'payments');
