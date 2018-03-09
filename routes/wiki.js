const express = require('express');
const router = express.Router()
const addPage = require('../views/addPage')

router.get('/', (request, response, next) => {
  try{
    response.send("wiki page get");
  } catch (error) { next(error) }
})

router.post('/', (request, response, next) => {
  try{
    const {name, email, content, title, status} =  request.body;

    response.send(name);
  } catch (error) { next(error) }
})
router.get('/add', (request, response, next) => {
  try{
    response.send(addPage());
  } catch (error) { next(error) }
})






module.exports = router;
