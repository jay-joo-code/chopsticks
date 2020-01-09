const categoryRouter = require('express').Router();
const Category = require('./../models/Category');

// GET ALL Categories
categoryRouter.get('/', async (req, res) => {
  try {
    const result = await Category.find({});
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});

// CREATE Category
categoryRouter.post('/create', async (req, res) => {
  try {
    const doc = new Category(req.body.name);
    const result = await doc.save();
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = categoryRouter;
