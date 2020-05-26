const itemRouter = require('express').Router();
const Item = require('../models/Item');
const User = require('../models/User');

// GET ITEMS: FILTERED SORTED PAGINATED
itemRouter.get('/', async (req, res) => {
  try {
    const { page, limit, sort } = req.query;

    // filter
    const { category, subcat, owner, search, minPrice, maxPrice } = req.query;
    const categoryFilter = category ? { category } : {};
    const subcatFilter = subcat ? { subcat } : {};
    const ownerFilter = owner ? { owner } : {};
    const searchFilter = search ? { $or: [{ name: { $regex: new RegExp(search, 'i') } }, { shopTitle: { $regex: new RegExp(search, 'i') } }] } : {};
    const priceFilter = minPrice && maxPrice ? { price: { $gte: Number(`${minPrice}0000`), $lte: Number(`${maxPrice}0000`) } } : {};

    const filter = {
      display: true,
      ...categoryFilter,
      ...subcatFilter,
      ...ownerFilter,
      ...searchFilter,
      ...priceFilter,
    };

    // sort
    const sortQueryMap = {
      recent: { createdAt: -1 },
      priceLow: { price: 1 },
      priceHigh: { price: -1 },
    };
    const sortQuery = ['recent', 'priceLow', 'priceHigh'].includes(sort) ? sortQueryMap[sort] : { sortIndex: -1 };

    // query
    let result;
    if (page && limit) {
      const options = {
        populate: 'owner',
        page,
        limit,
        sort: sortQuery,
      };
      result = await Item.paginate(filter, options);
    } 
    else {
      result = await Item.find(filter).populate('owner').sort(sortQuery);
    }

    res.send(result);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

// GET ALL ITEMS OWNED BY USER WITH USERID
itemRouter.get('/owner/:id', async (req, res) => {
  try {
    const result = await Item.find({ owner: req.params.id }).populate('owner');
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
    const owner = await User.findById(req.body.owner);
    if (!owner) throw new Error('owner is not a valid user');
    const doc = new Item({ ...req.body, shopTitle: owner.shop.title });
    const result = await doc.save();
    res.send(result);
  } catch (e) {
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
