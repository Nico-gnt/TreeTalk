var express = require('express');
var router = express.Router();
const database = require("../database/database");



router.use('/public', express.static('public'));

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'TreeTalk', userName: req.session.userName });
});


router.post('/getMessages', function (req, res, next) {
  database.getMessages((err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Erreur serveur" });
    }
    messages = result;
    const listeMessages = messages.map((message) => {
      return message.messages;
    });

    if (req.body.rechercher === "") {
      return res.json(listeMessages);
    }

    const searchTerm = req.body.rechercher;
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
  // check if user is connected
  if (!req.session.userName) {
    return res.status(401).json({ message: "Vous devez être connecté pour envoyer un message" });
  }

  var message =  req.session.userName + " : " + req.body.message;

  database.ajouterMessage(req.session.userName, message, (err, result) => {
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
