const express = require('express');
const router = express.Router();

// Batch Model
let Batch = require('../models/batch');
// Payment Model
let Payment = require('../models/payment');
// User Model
let User = require('../models/user');

// Add Route
router.get('/', ensureAuthenticated, function(req, res){

  res.render('dashboard', {
    balance: 0,
    holders_count: 0,
    for_investor1234_amount: 0,
    for_alice123_amount: 0,
    for_fees_amount: 0,
    distribution_amount: 0,
    pagename: 'dashboard'
  });
});

// Add Submit POST Route
router.post('/add', function(req, res){
  const payments = req.body.payments;
  const balance = req.body.balance;
  const five = req.body.five;
  const fees = req.body.fees;
  const distribution_amount = req.body.distribution_amount;
  const batch_name = req.body.batch_name;
  const holders_count = req.body.holders_count;

  let batch = new Batch();
  batch.batch_name = batch_name,
  batch.batch_timestamp = new Date(),
  batch.balance = balance,
  batch.for_investor1234_per = 5,
  batch.for_investor1234_amount = five,
  batch.for_alice123_per = 5,
  batch.for_alice123_amount = five,
  batch.for_fees_per = 3,
  batch.for_fees_amount = fees,
  batch.distribution_amount = distribution_amount,
  batch.payment_date = new Date(),
  batch.user_id = req.user._id
  batch.holders_count = holders_count;
  batch.save(function(err){
    if(err){
      console.log(err);
      return;
      //continue
    }
  });
  //pending add newly added batch_id to Payment model
  const payment_with_batch_id = payments.map(payment => {
    payment['batch_id'] = batch._id.toHexString();
  });
  Payment.collection.insert(payments, function (err, docs) {
    if (err){ 
      return console.error(err);
    } else {
      //console.log('ss')
      res.json("{}");
    }
  });
    
});



// Delete Article
router.delete('/:id', function(req, res){
  if(!req.user._id){
    res.status(500).send();
  }

  let query = {_id:req.params.id}

  Article.findById(req.params.id, function(err, article){
    if(article.author != req.user._id){
      res.status(500).send();
    } else {
      Article.remove(query, function(err){
        if(err){
          console.log(err);
        }
        res.send('Success');
      });
    }
  });
});

router.get('/history', ensureAuthenticated, function(req, res){
    Batch.find({}, function(err, batches){
    if(err){
      console.log(err);
    } else {
      res.render('history', {
        batches: batches,
        pagename: 'history'
      });
    }
  });
});

// Get Single Article
router.get('/history/:id', ensureAuthenticated,  function(req, res){
  Batch.findById(req.params.id, function(err, batch){
    Payment.find({batch_id:batch._id}, function(err, payments){
      console.log('p', payments);
      res.render('historydetail', {
        batch:batch,
        payments: payments,
        pagename: 'history'
      });
    });
  });
});

// Access Control
function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    req.flash('danger', 'Please login');
    res.redirect('/users/login');
  }
}

module.exports = router;