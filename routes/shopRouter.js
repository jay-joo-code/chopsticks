const shopRouter = require('express').Router();
const User = require('./../models/User');

shopRouter.get('/check-title', async (req, res) => {
  try {
    const sameTitle = await User.find({ 'shop.title': req.query.title });
    if (sameTitle.length === 0) {
      res.send(true);
    } else {
      res.status(400).send({ message: 'title already used' });
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

shopRouter.get('/', async (req, res) => {
  try {
    const all = await User.find({});
    const docs = all.filter((doc) => doc.shop.applied);
    res.send(docs);
  } catch (e) {
    res.status(500).send(e);
  }
});

shopRouter.put('/:id/update', async (req, res) => {
  try {
    const result = await User.findByIdAndUpdate(req.params.id, req.body);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});

shopRouter.post('/apply', async (req, res) => {
  try {
    const data = {
      mobile: req.body.mobile,
      mobileVerif: req.body.mobileVerif,
      shop: {
        title: req.body.title,
        intro: req.body.intro,
        applied: true,
        createdAt: new Date(),
      },
    };
    const result = await User.findByIdAndUpdate(req.body.id, data);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = shopRouter;
