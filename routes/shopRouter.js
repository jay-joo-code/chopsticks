const shopRouter = require('express').Router();
const User = require('./../models/User');

shopRouter.get('/check-title', async (req, res) => {
  try {
    const sameTitle = await User.find({ shop: { title: req.query.title }});
    if (sameTitle.length === 0) {
      res.send(true)
    }
    else {
      res.status(400).send({ message: 'title already used'})
    }
  }
  catch (e) {
    
  }
})

shopRouter.post('/apply', async (req, res) => {
  
})

module.exports = shopRouter;
