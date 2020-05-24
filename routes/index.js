/* eslint-disable no-param-reassign */
const express = require('express');
const schedule = require('node-schedule');
const Item = require('../models/Item');
const Order = require('../models/Order');
const ScrambleLog = require('../models/ScrambleLog');

const router = express.Router();

router.get('/', (req, res) => {
  res.send({
    active: true,
  });
});

router.use('/user', require('./userRouter'));
router.use('/item', require('./itemRouter'));
router.use('/shop', require('./shopRouter'));
router.use('/file', require('./fileRouter'));
router.use('/transaction', require('./transactionRouter'));
router.use('/order', require('./orderRouter'));

const scramble = async () => {
  try {
    new ScrambleLog({ env: 'prod' }).save();
    const allItems = await Item.find({});
    allItems.map(async (item) => {
      try {
        const newIdx = Math.floor(Math.random() * allItems.length);
        item.sortIndex = newIdx;
        item.optGrps.map((optGrp, i) => {
          if (!optGrp.opts.length) {
            item.optGrps[i].opts = [];
          }
        });
        await item.save();
      } catch (e) {
      }
    });
  } catch (e) {
    console.log('scramble error', e);
  }
};

function calcDateDiff(first, second) {
  // Take the difference between the dates and divide by milliseconds per day.
  // Round to nearest whole number to deal with DST.
  return Math.round((second-first)/(1000*60*60*24));
}

const orderStateCompleteToConfirmed = async () => {
  try {
    const completeOrders = await Order.find({ state: 'complete' });
    completeOrders.map(async (order) => {
      const dateDiff = calcDateDiff(new Date(order.updatedAt), new Date());
      if (dateDiff >= 7) {
        order.state = 'confirmed';
        order.save();
      }
    })
  } catch (e) {

  }
}

// daily runs
schedule.scheduleJob({ hour: 6, minute: 0 }, async () => {
  try {
    if (process.env.NODE_ENV === 'production' && process.env.REACT_APP_ENV !== 'release') {
      scramble();
      orderStateCompleteToConfirmed();
    }
  } catch (e) {
    console.log('scramble error', e);
  }
});

const logScrambles = async () => {
  try {
    const logs = await ScrambleLog.find({});
    console.log('logs :>> ', logs);
  }
  catch (e) {
    console.log('e :>> ', e);
  }
};

module.exports = router;
