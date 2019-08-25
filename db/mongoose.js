const mongoose = require('mongoose');

//mongodb connection here
mongoose.connect('mongodb+srv://ngonidzashe:Nickm%40ng13@cluster0-wdod3.azure.mongodb.net/test?retryWrites=true&w=majority',{
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
