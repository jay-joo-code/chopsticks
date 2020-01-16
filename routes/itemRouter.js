const itemRouter = require('express').Router();
const Item = require('./../models/Item');
const User = require('./../models/User');

// GET ALL Items THAT MATCH QUERY FILTER
itemRouter.get('/', async (req, res) => {
  try {
    const result = await Item.find(req.query).populate('owner');
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});

// FILTERED PAGINATED
itemRouter.get('/filtered', async (req, res) => {
  try {
    // SANITISE FILTER
    const filter = {
      category: req.query.category
    }
    
    // FILTER BY: QUERY
    const data = await Item.find(filter).populate('owner');
    let filteredData = data;
    
    // FILTER BY: PRICE
    if (req.query.minPrice && req.query.maxPrice) {
      const minPrice = req.query.minPrice + '0000';
      const maxPrice = req.query.maxPrice + '0000';
      filteredData = data.filter((item) => item.price >= minPrice && item.price <= maxPrice) 
    }

    res.send(filteredData)
  } catch (e) {
    res.status(500).send(e);
  }
})

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
    // CHECK OWNER ID EXISTS
    await User.findById(req.body.owner);
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
    const data = Object.assign({ display: true }, req.body);
    const result = await Item.findByIdAndUpdate(req.params.id, data);
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
