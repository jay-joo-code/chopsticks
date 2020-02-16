const orderRouter = require('express').Router();
const BootpayRest = require('bootpay-rest-client');
const Order = require('./../models/Order');
const config = require('./../config');

BootpayRest.setConfig(config.BOOTPAY_REST_ID, config.BOOTPAY_PK);

// GET ALL ITEMS OWNED BY USER WITH USERID
orderRouter.get('/:usertype/:uid', async (req, res) => {
  try {
    // :usertype is buyer OR seller
    const { usertype, uid } = req.params;
    const { monthIndex, state, seen } = req.query;
    const filter = {};
    filter[usertype] = uid;
    const results = await Order.find(filter).populate('seller');
    const filtered = results.filter((doc) => {
      let condition = true;
      // filter by monthIndex, state, seen
      if (monthIndex) {
        condition = new Date(doc.createdAt).getMonth() === Number(monthIndex) && condition;
      }
      if (state) condition = doc.state === state && condition;
      if (seen !== undefined) {
        const boolSeen = seen === 'true' ? true : false;
        condition = doc.seen === boolSeen && condition
      };
      return condition;
    })
    const reversedRes = filtered.reverse(); // sort recent
    res.send(reversedRes);
  } catch (e) {
    res.status(500).send(e);
  }
});

orderRouter.post('/:rid/cancel', async (req, res) => {
  try {
    const { rid } = req.params;
    const orders = await Order.find({});
    const order = orders.filter((order) => order.bootpay.receipt_id === rid)[0];

    // bootpay
    const token = await BootpayRest.getAccessToken();
    if (token.status !== 200) throw new Error('access token failed');
    const cancelRes = await BootpayRest.cancel(rid, order.cartObj.price, order.deliv.recipient, '결제 취소');
    if (cancelRes.status !== 200) {
      const newState = cancelRes.code === -13002 ? 'canceled' : 'error';
      order.state = newState;
      const result = await order.save();
      res.send(result);
    } else {
      // DB
      order.state = 'canceled';
      order.bootpay = cancelRes.data;
      const dbRes = await order.save();
      res.send(dbRes);
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

orderRouter.put(`/:id/update`, async (req, res) => {
  try {
    const result = await Order.findByIdAndUpdate(req.params.id, req.body);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
})


module.exports = orderRouter;
