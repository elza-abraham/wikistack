const express = require('express');
const router = express.Router()
const {addPage, editPage, main, userList, userPages, wikiPage} = require('../views')
const {Page} = require('../models')

// all these routes will be under localhost:3000/wiki since in app.js(the start module), we have app.use('/wiki', wikiRoute) (wikiRoute = is coded in /routes/user/)
const slugify = function(title){
  return title.replace(/\s+/g, '_').replace(/\W/g, '')
}
router.get('/', async (request, response, next) => {
  try {
    const allPages = await Page.findAll()
    response.send(main(allPages));
  } catch (error) { next(error) }
})
router.get('/add', (request, response, next) => {
  try {
    response.send(addPage());
  } catch (error) { next(error) }
})
router.get('/:slug', async (request, response, next) => {
  try {
    const foundPage = await Page.findOne({
      where: {slug: request.params.slug}
    })
    // response.json(foundPage);
    response.send(wikiPage(foundPage));
  } catch (error) { next(error) }
})
router.post('/', async (request, response, next) => {
  const page = new Page(request.body)
  try {
    // response.json(request.body)// to print the content of post object to the page
    await page.save();//.create will actually create an instance of page and then save
    response.redirect(`/wiki/${page.slug}`);
  } catch (error) { next(error) }
})

module.exports = router;
