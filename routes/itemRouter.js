const itemRouter = require('express').Router();
const Item = require('./../models/Item');
const User = require('./../models/User');

// GET ALL Items THAT MATCH QUERY FILTER
itemRouter.get('/', async(req, res) => {
  try {
    const result = await Item.find(req.query);
    res.send(result);
  }
  catch (e) {
    res.status(500).send(e);
  }
});

// GET Item BY ID
itemRouter.get('/:id', async(req, res) => {
  try {
    const result = await Item.findById(req.params.id).populate('owner');
    res.send(result);
  }
  catch (e) {
    res.status(500).send(e);
  }
});

// CREATE Item
itemRouter.post('/create', async(req, res) => {
  try {
    console.log(req.body.owner)
    // CHECK OWNER ID EXISTS
    await User.findById(req.body.owner);
    console.log('passed owner validation');
    // SAVE DOCUMENT
    const doc = new Item(req.body);
    const result = await doc.save();
    res.send(result);
  }
  catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

/* CLIENT CREATE REQUEST */
itemRouter.post('/client', async(req, res) => {
  try {
    const generatedData = {
      isReviewed: false,
    };
    const mergedData = { ...req.body, ...generatedData };
    const doc = new Item(mergedData);
    const result = await doc.save();
    res.send(result);
  }
  catch (e) {
    res.status(500).send(e);
  }
});

/* INCREMENT PV */
itemRouter.post('/:id/viewed', async(req, res) => {
  try {
    const doc = await Item.findById(req.params.id);
    const newPv = [...doc.pv];
    newPv.push(Date.now());
    doc.set('pv', newPv);
    const r = await doc.save();
    res.send(r);
  }
  catch (e) {
    res.status(500).send(e);
  }
});


module.exports = itemRouter;
