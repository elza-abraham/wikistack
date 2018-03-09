const express = require("express");

const app = express();
const{db} =  require('./models');

app.get("/", (req, res) => res.send("Hello World!"));

db.authenticate().then(() => {console.log('connected to the database')})
const PORT = 3000;

app.listen(PORT, () =>{
  console.log(`App listening in port ${PORT}`);
});
