import express                               from 'express';
import { fileURLToPath }                     from 'url';
import { dirname }                           from 'path';
import path                                  from 'path';
var app                                      = express();
import cors                                  from 'cors';
import { create, all, transaction }          from './dal.js';
import { fbSignup }                          from './fb.js';
import fbApp                                 from './admin.js';

var port = 4000;

const __dirname = dirname(fileURLToPath(import.meta.url));


app.use(express.static(path.join(__dirname, '../badbank/build')));
app.use(cors());


app.get('/account/create/:name/:email/:password/:fbId', function (req, res) {
  create(req.params.name, req.params.email, req.params.password, req.params.fbId).
    then((user) => {
      console.log(user);
      res.send(user);
    });
});

app.get('/auth', function(req, res){

  const idToken = req.headers.authorization;
  console.log('header: ', idToken);


  //verify token
  fbApp.auth().verifyIdToken(idToken)
    .then(function(decodedToken) {
      console.log('decodedToken:', decodedToken);
      res.send('Authentication Success!');
    }).catch(function(error) {
      console.log('error:',error);
      res.send('Authentication Fail!');
    });
})

app.get('/account/all', function(req, res) {
  all().
    then((docs) => {
      res.send(docs);
    });
});

app.get('/account/transaction/:id/:amount', function (req, res) {
  transaction(req.params.id, req.params.amount)
    .then((docs) => {
      res.send(docs);
    })
})

app.get('/account/createfb/:email/:password', function (req, res) {
  fbSignup(req.params.email, req.params.password)
    .then((user) => res.send(user))
})

app.listen(port, function(){
  console.log(`Running on Port: ${port}`);
})