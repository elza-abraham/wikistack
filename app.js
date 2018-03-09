const express = require("express");

const app = express();
const models = require('./models');

app.get("/", (req, res) => res.send("Hello World!"));

const init = async () => {
  await models.User.sync()
  await models.Page.sync()
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
}

init();
