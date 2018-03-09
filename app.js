const express = require("express");

const app = express();
const models = require('./models');

const wikiRoute = require('./routes/wiki')
const userRoute = require('./routes/user')
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/wiki', wikiRoute)
app.use('/user', userRoute)
// app.get("/", (req, res) => res.send("Hello World!"));
app.get('/',(request, response) => {
  response.redirect('/wiki');
})
const init = async () => {
  await models.Page.sync();
  await models.User.sync();
  await models.db.sync({force: true})
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
}

init();
