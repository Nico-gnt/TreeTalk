var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


const crypto = require('crypto');
const exec = require('child_process').exec;

router.post('/webhook', (req, res) => {
  const hmac = crypto.createHmac('sha1', 'aze123AZERSD79564azesd4Q5DFQ@QD646DFQDKLKM');
  const digest = 'sha1=' + hmac.update(JSON.stringify(req.body)).digest('hex');
  const checksum = req.headers['x-hub-signature'];
  if (!checksum || !digest || checksum !== digest) {
      return res.status(403).send('Invalid signature');
  }

  // get current dir
  const currentDir = __dirname;
  // remove routes dir
  const dir = currentDir.replace('/routes', '');
  console.log('current dir: ' + currentDir);
  exec('cd ' + __dirname+ ' && git reset --hard HEAD && git pull && pm2 restart app', (error, stdout, stderr) => {
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
