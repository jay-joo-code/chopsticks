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

    // filter by monthIndex, state, seen
    const filtered = results.filter((doc) => {
      let condition = true;
      if (monthIndex) {
        condition = new Date(doc.createdAt).getMonth() === Number(monthIndex) && condition;
      }
      if (state) {
        let newCondition = doc.state === state;

        // also filter pending states
        if (state === 'canceled') {
          newCondition = doc.state === 'cancelPending' || newCondition;
        } else if (state === 'exchanged') {
          newCondition = doc.state === 'exchangePending' || newCondition;
        } else if (state === 'refunded') {
          newCondition = doc.state === 'refundPending' || newCondition;
        }
        condition = newCondition && condition;
      }
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
      const newState = cancelRes.code === -13002 ? 'canceled' : 'error';
      order.state = newState;
      const result = await order.save();
      res.send(result);
    } else {
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
