var express     = require('express');
const path      = require('path');
var app         = express();

var port = 4000;

app.use(express.static(path.join(__dirname, '../badbank/build')));


app.get('/account/create/:name/:email/:password', function (req, res) {
  res.send({
    name:     req.params.name,
    email:    req.params.email,
    password: req.params.password
  });
});















app.listen(port, function(){
  console.log(`Running on Port: ${port}`);
})