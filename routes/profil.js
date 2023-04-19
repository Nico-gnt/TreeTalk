const express = require('express');
const database = require('../database/database');
const router = express.Router();


router.get('/', function (req, res, next) {
  if (req.session.userName == null || req.session.userName == undefined)
    return res.render('login', { title: 'TreeTalk', userName: req.session.userName });
  
  return res.render('profil', { title: 'TreeTalk', userName: req.session.userName });
});

router.get('/signup', function (req, res, next) {
  if (!req.session.userName == null && !req.session.userName == undefined)
    return res.render('profil', { title: 'TreeTalk', userName: req.session.userName });

  return res.render('signup', { title: 'TreeTalk', userName: req.session.userName });
});


module.exports = router;
