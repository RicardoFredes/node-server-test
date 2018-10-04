var express = require('express')
  ,expressLayouts = require('express-ejs-layouts')
  ,app = express()
  ,port = 8080
  ,staticDirname = '/public';

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(staticDirname, express.static(__dirname + '/static'));
app.use('/', function(req, res){
  var pathname = req.url;
  res.render(__dirname + '/views/pages' + pathname, {static: staticDirname, pathname});
});

app.listen(port);