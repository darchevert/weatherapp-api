var express = require('express');
var app = express();
app.set('view engine', 'ejs');
app.use(express.static('static'));
var request = require('request');

var ville = [
];

app.get('/', function (req, res) {
  res.render('home', {
    list : ville,
  });
});

app.get('/add', function (req, res) {
  console.log(req.query);
  request("http://api.openweathermap.org/data/2.5/weather?q="+req.query.ville+"&APPID=285d22b41e9939ae505b88f73274f9a3&units=metric&lang=fr", function(error, response, body) {
    var body = JSON.parse(body);
    req.query.name = body.name
    req.query.description = body.weather[0].description
    req.query.temp_min = body.main.temp_min
    req.query.temp_max = body.main.temp_max
    req.query.picto = body.weather[0].icon
      });
  ville.push(req.query);

  res.render('home', {
    list : ville,
  });
});



app.get('/delete', function (req, res) {
  console.log(req.query.indice);
  ville.splice(req.query.indice, 1);

  res.render('home', {
    list: ville,
  });
});

app.listen(80, function () {
  console.log('Jusque là,tout va bien!');
});
