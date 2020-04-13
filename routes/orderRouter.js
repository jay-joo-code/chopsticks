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

    // filter by user
    const filter = {};
    filter[usertype] = uid;
    const results = await Order.find(filter).populate('seller').populate('buyer');

    const filtered = results.filter((doc) => {
      let condition = true;
      
      // filter: monthIndex
      if (monthIndex) {
        condition = new Date(doc.createdAt).getMonth() === Number(monthIndex) && condition;
      }
      
      // filter: state
      // filtering my state is string inclusive
      // ex) state "cancel" should include cancelRequested, cancelPending etc
      if (state) {
        condition = doc.state.includes(state) && condition;
      }
      
      // filter: seen
      if (seen !== undefined) {
        const boolSeen = seen === 'true';
        condition = doc.seen === boolSeen && condition;
      }
      return condition;
    });

    // sort recent
    const reversedRes = filtered.reverse();
    res.send(reversedRes);
  } catch (e) {
    res.status(500).send(e);
  }
});

orderRouter.get('/:id', async (req, res) => {
  try {
    const doc = await Order.findById(req.params.id);
    res.send(doc)
  } catch (e) {
    res.status(500).send(e);
  }
});

orderRouter.post('/create', async (req, res) => {
  try {
    const newOrderRes = await new Order(req.body).save();
    res.send(newOrderRes)
  } catch (e) {
    res.status(500).send(e);
  }
});

orderRouter.post('/:id/cancel', async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    const rid = order.bootpay.receipt_id;

    // bootpay cancel
    const token = await BootpayRest.getAccessToken();
    if (token.status !== 200) throw new Error('access token failed');
    const prms = [rid, order.cartObj.price, order.deliv.recipient, order.stateMsg];
    const cancelRes = await BootpayRest.cancel(...prms);

    // update db order state
    if (cancelRes.status !== 200) {
      console.log('Bootpay cancel error', cancelRes);
      throw new Error(cancelRes);
    } 
    else {
      order.state = 'canceled';
      order.bootpay = cancelRes.data;
      const dbRes = await order.save();
      res.send(dbRes);
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

orderRouter.post('/:id/state-change/:state', async (req, res) => {
  try {
    const { id, state } = req.params;
    const { stateMsg } = req.body;

    const order = await Order.findById(id);
    order.state = state;
    if (stateMsg) order.stateMsg = stateMsg;
    const result = await order.save();

    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});


orderRouter.put('/:id/update', async (req, res) => {
  try {
    const result = await Order.findByIdAndUpdate(req.params.id, req.body);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});


module.exports = orderRouter;
