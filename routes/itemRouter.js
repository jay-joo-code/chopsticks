const itemRouter = require('express').Router();
const Item = require('./../models/Item');
const User = require('./../models/User');
const sort = require('./../util/sort');

// GET ITEMS: FILTERED SORTED PAGINATED
itemRouter.get('/', async (req, res) => {
  try {
    // CREATE FILTER: CATEGORY, OWNER, SEARCH
    const { category, subcat, owner, search } = req.query;
    const categoryFilter = category ? { category } : {};
    const subcatFilter = subcat ? { subcat } : {};
    const ownerFilter = owner ? { owner } : {};
    const searchFilter = search ? { name: { $regex: search } } : {};

    const filter = {
      display: true,
      ...categoryFilter,
      ...subcatFilter,
      ...ownerFilter,
      ...searchFilter,
    };

    // QUERY WITH FILTER DEFINED ABOVE
    // PAGINATION IF REQUESTED
    let result;
    const { page, limit } = req.query;
    if (page && limit) {
      const options = {
        populate: 'owner',
        page,
        limit,
      };
      result = await Item.paginate(filter, options);
    } else result = await Item.find(filter).populate('owner');
    const data = result.docs;
    let filteredData = data;

    // FILTER BY: PRICE
    if (req.query.minPrice && req.query.maxPrice) {
      const minPrice = `${req.query.minPrice}0000`;
      const maxPrice = `${req.query.maxPrice}0000`;
      filteredData = data.filter((item) => item.price >= minPrice && item.price <= maxPrice);
    }

    // SORT
    let sortedData = filteredData;
    const sortCode = req.query.sort;
    if (sortCode === 'recent') sortedData = sort.sortRecent(filteredData);
    else if (sortCode === 'priceLow') sortedData = sort.sortPriceLow(filteredData);
    else if (sortCode === 'priceHigh') sortedData = sort.sortPriceHigh(filteredData);

    const mergedData = { ...result, docs: sortedData };
    res.send(mergedData);
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
