import express            from 'express';
import { fileURLToPath }  from 'url';
import { dirname }        from 'path';
import path               from 'path';
var app                   = express();
import cors               from 'cors';
import { create, all }    from './dal.js';

var port = 4000;

const __dirname = dirname(fileURLToPath(import.meta.url));


app.use(express.static(path.join(__dirname, '../badbank/build')));
app.use(cors());


app.get('/account/create/:name/:email/:password', function (req, res) {
  create(req.params.name, req.params.email, req.params.password).
    then((user) => {
      console.log(user);
      res.send(user);
    });
});

app.get('/account/all', function(req, res) {
  all().
    then((docs) => {
      res.send(docs);
    });
    
});

app.listen(port, function(){
  console.log(`Running on Port: ${port}`);
})