const orderRouter = require('express').Router();
const Order = require('./../models/Order');

// GET ALL ITEMS OWNED BY USER WITH USERID
orderRouter.get('/:usertype/:uid', async (req, res) => {
  try {
    // :usertype is buyer OR seller
    const { usertype, uid } = req.params;
    let filter = {};
    filter[usertype] = uid;
    console.log(filter);
    const results = await Order.find(filter).populate('seller');
    console.log(results);
    res.send(results);
  } catch (e) {
    res.status(500).send(e);
  }
});


module.exports = orderRouter;
