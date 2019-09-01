const mongoose = require('./db/mongoose.js');
const fs = require('fs');
const express = require('express');
const bodyparser = require('body-parser');
const session = require('express-session');
const engine = require('ejs-mate');
const ejs = require('ejs');
const cookieparser = require('cookie-parser');
const mongoStore = require('connect-mongo')(session);
const path = require('path');
const cors = require('cors');
// const errorHandler = require('errorhandler');

//Initiate our app
const app = express();

//Configure our app
//View Engine
app.engine('ejs',engine);
app.set('view engine', 'ejs');

//Static Files
app.use(express.static(path.join(__dirname , '/public')));

//Body Parser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

//Cookie Parser
app.use(cookieparser());

//Save Session
app.use(session({
  save:true,
  resave: true,
  saveUninitialized: true,
  secret:"panashe",
  cookie: {maxAge: 60000},
  store:new mongoStore({url:'mongodb+srv://ngonidzashe:Nickm%40ng13@cluster0-wdod3.azure.mongodb.net/test?retryWrites=true&w=majority',autoReconnect:true})
}));

//Models & Routes
const User = require('./models/users');
app.use(require('./routes'));

//GET requests for the landing, signup & login pages
app.get('/', (req, res) => {
  res.render('index', {
    title: 'EMACL || Welcome'
  });
});

//GET request for registering
app.get('/signup', (req, res) => {
  res.render('accounts/signup', {
    title: 'EMACL || Register'
  });
});

//GET request for logging in 
app.get('/login', (req, res) => {
  res.render('accounts/signin', {
    title: 'EMACL || Login'
  });
});

const PORT = process.env.PORT || 8080;

//Start our server app
app.listen(PORT, (err) => {
  if(err){
    console.log(err);
  }
  console.log(`Printer running on port: ${PORT}.`);
});
