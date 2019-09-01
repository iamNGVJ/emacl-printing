const {Paynow} = require('paynow');
const express = require('express');
const mongoose = require('mongoose');
const Users = mongoose.model('User');

//variables
var router = express.Router();
const INTEGRATION_ID = 8184;
const INTEGRATION_KEY = 'd478fc7c-e9bc-49c0-8ac6-11189be85e80';

router.post('/topup', (req, res) => {
  const topup = {
    contact: req.body.contact,
    amount: req.body.amount,
    email: req.body.email
  };

  var uniqueInvoice = Math.floor(Math.random() * 1000);
  console.log(uniqueInvoice);

  let paynow = new Paynow(INTEGRATION_ID, INTEGRATION_KEY);

  Users.find({
    email: topup.email
  }).then((user) => {
    if(user){
      try{
        let payment = paynow.createPayment(`EMACL1608-${uniqueInvoice}`, topup.email);

        payment.add('Wallet-Topup', topup.amount);

        paynow.sendMobile(
          payment,
          `${topup.contact}`,
          'ecocash'
        ).then(function(response){
          if(response.success){
            let instructions = response.instructions;

            let pollUrl = response.pollUrl;

            let paymentStatus = paynow.pollTransaction(pollUrl);

            if(paymentStatus.paid()){
              Users.findOneAndUpdate({
                email: topup.email
              },{
                $inc:{
                wallet: topup.amount
              }
            },{
                returnOriginal: false
            });
          }
        }else{
            console.log(response.error);
          }
        }).catch((err) => {
          console.log('Failed to make payment', err);
        });
      }catch(err){
        console.log(err.message);
      }
    }else{
      console.log('User doesn\'t exist');
    }
  });
});

module.exports = router;
