const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const wikiRoute = require('./routes/wiki')
const userRoute = require('./routes/user')

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, './public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/wiki', wikiRoute)
app.use('/user', userRoute)
// app.get("/", (req, res) => res.send("Hello World!"));
app.get('/', (request, response) => {
  response.redirect('/wiki');
})


module.exports = app;
