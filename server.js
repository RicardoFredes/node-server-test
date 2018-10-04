var express = require('express')
  ,expressLayouts = require('express-ejs-layouts')
  ,routes = require('./controllers/routes.js');

var app = express();
var port = 8080;
var staticDirname = '/public';

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(staticDirname, express.static(__dirname + '/public'));
console.log(routes)

/*
app.use('/', function(req, res){
  var pathname = req.url;
  res.render(__dirname + '/views/pages' + pathname, {static: staticDirname, pathname});
});
*/
app.listen(port);
