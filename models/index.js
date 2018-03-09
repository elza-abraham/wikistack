const Sequelize = require("sequelize");
const db = new Sequelize('postgres://localhost:5432/wikistack')

const Page = db.define('Page', {
  name: {
    type: Sequelize.STRING
  },
  slug: {
    type: Sequelize.STRING
  },
  content: {
    type: Sequelize.TEXT
  }
  ,
  status: {
    type: Sequelize.ENUM('open', 'closed')
  }

})
const User = db.define('User',
  {
    name: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING }
  })

module.exports = { Page, User };
