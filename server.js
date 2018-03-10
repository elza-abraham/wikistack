const http = require('http');
const app = require('./app')
const server = http.createServer(app)

const {db, Page, User} = require('./models');

//put it before the server starts listening @3000
const init = async () => {
  try {
    await Page.sync();
    await User.sync();
    await db.sync({force: false})//suppose our code make changes to table eg: i made name not null, this will ensure that updates table. if not given, it will not add not null to that existing table. Basically drop the existing table and recreate it.
  }
  catch (error){console.log(error.message)}
}

init();

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});


