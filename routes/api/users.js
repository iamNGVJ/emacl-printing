const fs = require('fs');
const mongoose = require('mongoose');
const express = require('express');
const auth = require('../auth');
const Users = mongoose.model('User');
const Docs = require('./../../models/docs');
const router = express.Router();
const path = require('path');

//Post new user route (optional, everyone has access)
router.post('/register', auth.optional, (req, res, next) => {
  const user  = {
    name : req.body.name,
    surname : req.body.surname,
    email : req.body.email,
    password : req.body.password
  };

  if(!user.email){
    return res.status(422).json({
      errors: {
        email: 'is required'
      }
    });
  }

  if(!user.name){
    return res.status(422).json({
      errors: {
        name: 'is required'
      }
    });
  }

  if(!user.surname){
    return res.status(422).json({
      errors: {
        surname: 'is required'
      }
    });
  }

  if(!user.password){
    return res.status(422).json({
      errors: {
        password: 'is required'
      }
    });
  }

  const finalUser = new Users(user);

  finalUser.setPassword(user.password);

  return finalUser.save()
    .then((user) => {
      if(user){

        if (!fs.existsSync(__dirname + `/../uploads/documents/`)) {
          fs.mkdirSync(__dirname + `/../uploads/documents/`);
        }
        if (!fs.existsSync(__dirname + `/../uploads/documents/${user.name}`)){
          console.log(`---${user.name}'s folder does not exist. Creating it.`);
          fs.mkdirSync(__dirname + `/../uploads/documents/${user.name}`);
        }
        console.log('Registered New User!');
        return res.redirect('/login');
      }else{
        console.log('Failed to signup');
        return res.redirect('/signup');
      }
    }).catch((err) => {
      console.log('Server error');
      return res.redirect('/signup');
    });
});

router.post('/login', auth.optional, (req, res, next) => {
  const user  = {
    email : req.body.email,
    password : req.body.password
  };

  if(!user.email){
    return res.status(422).json({
      errors: {
        email: 'is required'
      }
    });
  }

  if(!user.password){
    return res.status(422).json({
      errors: {
        password: 'is required'
      }
    });
  }

  authenticate(user.email, user.password, res);
});

//GET dashboard route (required, only authenticated users have access)
router.get('/dashboard', auth.required, (req, res, next) => {
  const {payload: {id}} = req;

  return Users.findById(id)
    .then((user) => {
      if(!user){
        return res.sendStatus(400);
      }

      return res.json({user: user.toAuthJSON()});
    });
});

var authenticate = (email, password, res) => {
  Users.findOne({email})
    .then((newUser) => {
      if(!newUser || !newUser.validatePassword(password)){
        return (null, false, {errors: {'email or password': 'is invalid'}});
      }else if(newUser){
        const user = newUser;
        user.token = newUser.generateJWT();

        console.log('Logging in user.');
        res.set('Authorization', `Token ${user.token}`);
        res.render('dashboard', {
          title: 'Dashboard',
          name: user.name,
          wallet: user.wallet
      });
    }
  }).catch((err) => console.log(err.message));
};

module.exports = router;
