const express = require('express');
const router = express.Router()

// all these routes will be under localhost:3000/wiki since in app.js(the start module), we have app.use('/wiki', userRoute) (userRoute = is coded in /routes/user/)

router.get('/', (request, response, next) => {
  try{
    response.send("user page get");
  } catch (error) { next(error) }
})

router.post('/', (request, response, next) => {
  try{
    response.send("wiki page post");
  } catch (error) { next(error) }
})
router.get('/add', (request, response, next) => {
  try{
    response.send(addPage());
  } catch (error) { next(error) }
})

module.exports = router;
