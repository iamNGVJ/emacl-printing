const mongoose = require('mongoose');

//mongodb connection here
mongoose.connect('mongodb://localhost/printerJob',{
  useNewUrlParser: true,
  useCreateIndex: true
}, (err) => {
  if(err){
    console.log(err);
  }else{
    console.log('Database connected.');
  }
});
//mongodb connection ends here

module.exports = {mongoose};
