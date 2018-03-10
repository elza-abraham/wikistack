const Sequelize = require("sequelize");
const db = new Sequelize('postgres://localhost:5432/wikistack', { logging: true })
//logging false will turn off the loggin of sql running log
db.authenticate().then(() => {console.log('Connection successful')})

function generateSlug (title){
  return title.replace(/\s+/g, '_').replace(/\W/g, '')
}

//CREATE TABLE IF NOT EXISTS "pages" ("id"   SERIAL , "title" VARCHAR(255) NOT NULL, "slug" VARCHAR(255) NOT NULL, "content" TEXT NOT NULL, "status" "public"."enum_pages_status", "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, PRIMARY KEY ("id"));
const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  }
  ,
  status: {
    type: Sequelize.ENUM('open', 'closed')
  }
})

Page.beforeValidate((page) => {
  if (!page.slug)//if null value is seen right before saving
    page.slug = generateSlug(page.title);
});

//CREATE TABLE IF NOT EXISTS "users" ("id"   SERIAL , "name" VARCHAR(255) NOT NULL, "email" VARCHAR(255) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, PRIMARY KEY ("id"));
const User = db.define('user',
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    }
  }
)
module.exports = { db, Page, User };
