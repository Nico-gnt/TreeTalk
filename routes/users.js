const express = require('express');
const database = require('../database/database');
const router = express.Router();



router.post('/signup', (req, res, next) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    return res.status(400).json({ message: 'Nom d\'utilisateur ou mot de passe manquant.' });
  }

  database.ajouterCompte(userName, password, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erreur serveur.' });
    }
    req.session.userName = userName;
    return res.status(201).json({ message: 'Compte créé.' });
  });
});

// add disconnect route
router.get('/disconnect', (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
});

router.post('/login', function (req, res, next) {
  const userName = req.body.username;
  const password = req.body.password;
  database.compteExiste(userName, password, function (err, isAuthenticated) {
    if (err) {
      console.error(err);
      res.status(500).json({message: 'Erreur serveur.'});
      return;
    }
    if (isAuthenticated) {
      req.session.userName = userName;
      res.status(200).json({message: 'Connexion réussie.'});
    } else {
      res.status(401).json({message: 'Invalide nom d\'utilisateur ou mot de passe.'});
    }
  });
});

module.exports = router;
