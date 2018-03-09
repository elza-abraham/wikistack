const express = require('express');
const router = express.Router()
const addPage = require('../views/addPage')
const {Page} = require('../models')

const slugify = function(title){
  return title.replace(/\s+/g, '_').replace(/\W/g, '')
}
router.get('/', (request, response, next) => {
  try{
    response.send("wiki page get");
  } catch (error) { next(error) }
})

router.post('/', async (request, response, next) => {


  const page = new Page({
    title: request.body.title,
    content: request.body.content,
    slug: slug(request.body.title)
  })

  try{
    await page.save();
    response.redirect('/')
  } catch (error) { next(error) }
})
router.get('/add', (request, response, next) => {
  try{
    response.send(addPage());
  } catch (error) { next(error) }
})






module.exports = router;
