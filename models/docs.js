const mongoose = require('mongoose');

const DocsSchema = new mongoose.Schema({
  email: {
    type:String,
    lowercase:true
  },
  title: String,
  uploadDate: {
    type: String,
    default: new Date().toString()
  },
  status: {
    type: String,
    default: 'Submitted',
    lowercase: true
  }
});

var docs = mongoose.model('Docs', DocsSchema);

module.exports = docs;
