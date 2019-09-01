const fs = require('fs');
const express = require('express');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const Docs = require('./../../models/docs');
// const decimal = require('decimal');

const app = express();
const router = express.Router();

router.post('/', (req, res) => {
  console.log('Upload Process Fired!');
  var fileName = req.files.file.name;

  console.log(`Uploading ${fileName} for printing`);

  Docs.find({email: req.body.email}).then((user) => {
    req.files.file.mv(`./documents/${user.name}/` + fileName,(err) => {
      if(err){
        console.log(err.message);
        res.send('An error occured');
      }else{
        res.send('Upload complete');
      }
    })
  }).catch((err) => {
    console.log(err.message);
  });
});

// router.get(`/download/:filename`, function(req, res) {
//   // console.log("downloading: " + req.params.filename)
//   res.download(
//     __dirname + `/documents/${file.fileType}/` + req.params.filename
//   );
// });

module.exports = router;
