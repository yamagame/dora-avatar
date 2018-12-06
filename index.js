const settings = require('./settings');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const jws = require('jws');
const url = require('url');
const bcrypt = (() => {
  try { return require('bcrypt'); }
  catch(e) { return require('bcryptjs'); }
})();
const client = require('./client.js');

function getCredential(path) {
  if (path) {
    return fs.readFileSync(path, 'utf8');
  }
  return null;
}
const publicKey = getCredential(settings.robot_public_key);

function verifySignature(userId, signature, callback) {
  if (publicKey) {
    const stream = jws.createVerify({
      algorithm: 'RS256',
      publicKey,
      signature,
    })
    stream.on('done', function(verified, obj) {
      if (verified) {
        callback(obj.payload === userId);
        return;
      }
      callback(false);
    });
    stream.on('error', function(err) {
      console.error(err);
      callback(false);
    });
  } else {
    callback(bcrypt.compareSync(userId, signature));
  }
}

const isValidKey = (req, res, next) => {
  if (!publicKey) {
    return next();
  }
  const unauthorized = () => {
    res.statusCode = 401;
    res.end('Unauthorized\n');
  }
  if ('body' in req && 'user_id' in req.body && 'signature' in req.body) {
    verifySignature(req.body.user_id, req.body.signature, (verified) => {
      if (verified) {
        return next();
      }
      unauthorized();
    })
    return;
  }
  unauthorized();
}

const express = require('express')
const bodyParser = require('body-parser');

const PORT = settings.port;

const app = express();
app.use(bodyParser.json({ type: 'application/json' }))

app.use(express.static('public'));

/*
  curl -X POST -d '{"status":"idle", "message":""}' --header "content-type:application/json" http://localhost:5100/action
  curl -X POST -d '{"status":"talk", "message":"Hello"}' --header "content-type:application/json" http://localhost:5100/action
*/
app.post('/action', isValidKey, (req, res) => {
  client.action(req.body);
  res.send('OK\n')
})

const server = require('http').Server(app);
server.listen(PORT, () => console.log(`dora-projector server listening on port ${PORT}!`))

client.init(server);
