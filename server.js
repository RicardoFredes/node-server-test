const express = require('express')
const expressLayouts = require('express-ejs-layouts')

const port = process.env.PORT || 8080
const staticDirname = '/public'

const app = express()
const routes = require('./controllers')

app.set('view engine', 'ejs')

app.use(expressLayouts)
app.use(staticDirname, express.static(__dirname + '/public'))
app.use('/', routes)

app.listen(port)
