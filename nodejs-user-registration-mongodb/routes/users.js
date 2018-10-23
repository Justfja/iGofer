var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: './uploads'});
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

/* GET users listing. */
router.get('/hire', function(req, res, next) {
  res.render('hire');
});

router.get('/contact', function(req, res, next) {
  res.render('contact');
});

router.get('/handyman', function(req, res, next) {
  res.render('handyman');
});

router.get('/member', function(req, res, next) {
  res.render('member');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

// router.post('/login',
//   passport.authenticate('local',{failureRedirect:'/login', failureFlash: 'Invalid username or password'}),
//   function(req, res) {
//    req.flash('success', 'You are now logged in');
//    res.redirect('/');
// });

router.post('/member', function(req, res, next) {
  var firstname = req.body.firstname;
  var surname = req.body.surname;
  var email = req.body.email;
  var phonenumber = req.body.phonenumber;
  var password = req.body.password;
  var password2 = req.body.password2;

  // Form Validator
  req.checkBody('firstname','First Name field is required').notEmpty();
  req.checkBody('surname','Surname field is required').notEmpty();
  req.checkBody('email','Email field is required').notEmpty();
  req.checkBody('email','Email is not valid').isEmail();
  req.checkBody('phonenumber','phonenumber field is required').notEmpty();
  req.checkBody('password','Password field is required').notEmpty();
  req.checkBody('password2','Passwords do not match').equals(req.body.password);

  // Check Errors
  var errors = req.validationErrors();

  if(errors){
  	res.render('member', {
  		errors: errors
  	});
  } else{
  	var newMember = new Member({
      firstname: firstname,
      surname:surname,
      email: email,
      phonenumber: phonenumber,
      password: password,
    });

    Member.createmember(newMember, function(err, member){
      if(err) throw err;
      console.log(member);
    });

    req.flash('success', 'You are now registered and can login');

    res.location('/login');
    res.redirect('/login');
  }
});
module.exports = router;
