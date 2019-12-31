const itemRouter = require('express').Router();
const Item = require('./../models/Item');
const User = require('./../models/User');

// GET ALL Items THAT MATCH QUERY FILTER
itemRouter.get('/', async (req, res) => {
  try {
    const result = await Item.find(req.query);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});

// GET Item BY ID
itemRouter.get('/:id', async (req, res) => {
  try {
    const result = await Item.findById(req.params.id).populate('owner');
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});

// CREATE Item
itemRouter.post('/create', async (req, res) => {
  try {
    console.log(req.body.owner);
    // CHECK OWNER ID EXISTS
    await User.findById(req.body.owner);
    console.log('passed owner validation');
    // SAVE DOCUMENT
    const doc = new Item(req.body);
    const result = await doc.save();
    res.send(result);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

// UPDATE Item
itemRouter.put('/:id/update', async (req, res) => {
  try {
    const result = await Item.findByIdAndUpdate(req.params.id, req.body);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});

// DELETE Item
itemRouter.delete('/:id/delete', async (req, res) => {
  try {
    const result = await Item.findByIdAndDelete(req.params.id);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});


module.exports = itemRouter;
