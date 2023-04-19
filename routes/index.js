var express = require('express');
var router = express.Router();
const database = require("../database/database");



router.use('/public', express.static('public'));

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'TreeTalk' });
});

/* GET profil page. */
router.get('/Profil', function (req, res, next) {
  res.render('profil', { title: 'TreeTalk' });
});

/* GET search page. */
router.get('/Search', function (req, res, next) {
  res.render('search', { title: 'TreeTalk' });
});


//get rechercher
router.post("/rechercher", function (req, res, next) {
  const rechercherTerm = req.body.rechercher;

  res.cookie('rechercherTerm', rechercherTerm)

  res.send("");
});



router.get('/getMessages', function (req, res, next) {
  database.getMessages((err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Erreur serveur" });
    }
    messages = result;
    const listeMessages = messages.map((message) => {
      return message.messages;
    });

    if (!req.cookies.rechercher) {
      return res.json(listeMessages);
    }

    const searchTerm = req.cookies.rechercher;
    res.clearCookie('rechercher');
    const messagesFliter = listeMessages.filter(message => message.includes("#" + searchTerm));
    return res.json(messagesFliter);
  });

});

router.get("/clearDB", function (req, res, next) {
  database.clearMessages((err, result) => {
    res.send("DB cleared");
  });
});


router.post('/sendMessage', function (req, res, next) {
  var message = req.body.message;
  //message is in to part user : message get the two
  const messageplit = message.split(":");
  const message54 = message[1];
  const user = message[0];

  console.log(message)
  database.ajouterMessage(0, message, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Erreur serveur" });
    }
    return res.json({ message: "Message envoyé" });
  });
});


























const crypto = require('crypto');
const exec = require('child_process').exec;

router.post('/webhook', (req, res) => {
  const hmac = crypto.createHmac('sha1', 'aze123AZERSD79564azesd4Q5DFQ@QD646DFQDKLKM');
  const digest = 'sha1=' + hmac.update(JSON.stringify(req.body)).digest('hex');
  const checksum = req.headers['x-hub-signature'];
  if (!checksum || !digest || checksum !== digest) {
    return res.status(403).send('Invalid signature for webhook');
  }

  // get current dir
  const currentDir = __dirname;
  // remove routes dir
  const dir = currentDir.replace('/routes', '');
  console.log('current dir: ' + currentDir);
  exec('cd /home/ubuntu/back_end_TreeTalk && git reset --hard HEAD && git pull && npm install && pm2 restart app', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).send(`Error updating app: ${error}`);
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
    res.send('App updated successfully!');
  });
});

module.exports = router;
