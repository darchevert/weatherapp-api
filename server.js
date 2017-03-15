var express = require('express');
var app = express();
app.set('view engine', 'ejs');
app.use(express.static('static'));





app.listen(80, function () {
  console.log('Example app listening on port 80!');
});
