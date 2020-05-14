/* eslint-disable no-console */
const transactionRouter = require('express').Router();
const BootpayRest = require('bootpay-rest-client');
const config = require('../config');
const Transaction = require('../models/Transaction');
const TransactionError = require('../models/TransactionError');
const Order = require('../models/Order');
const User = require('../models/User');
const Item = require('../models/Item');

const isDevEnv = process.env.REACT_APP_ENV === 'release' || process.env.NODE_ENV === 'development';
const REST_ID = isDevEnv ? config.BOOTPAY_REST_ID_DEV : config.BOOTPAY_REST_ID;
const PK = isDevEnv ? config.BOOTPAY_PK_DEV : config.BOOTPAY_PK;

const decItemQty = async (itemId, targetIndex, decQty) => {
  const item = await Item.findById(itemId);

  if (item.madeOnOrder) return;

  if (item.optData.length !== 0) {
    // 옵션재고 차감
    const prevOptData = [...item.optData];
    const newOptData = prevOptData.map((opt) => {
      if (targetIndex.join() === opt.index.join()) {
        const newOpt = {
          ...opt.toObject(),
          qty: opt.qty - decQty || 0,
        };
        return newOpt;
      }
      return opt;
    });
    item.optData = newOptData;
  } else {
    // 상품재고 차감
    item.stock = item.stock - decQty || 0;
  }
  await item.save();
};

// process transaction
transactionRouter.post('/:rid/process', async (req, res) => {
  try {
    BootpayRest.setConfig(REST_ID, PK);
    const { rid } = req.params;
    const response = await BootpayRest.getAccessToken();
    if (response.status !== 200 || response.data.token === undefined) {
      throw new Error('access token error');
    }
    const verifRes = await BootpayRest.verify(rid);
    if (verifRes.status !== 200) {
      throw new Error('verification error');
    }

    // store transaction details to DB
    const { transaction } = req.body;
    transaction.bootpay = verifRes.data;
    const isValid = verifRes.data.price === transaction.price && verifRes.data.status === 1;
    if (!isValid) throw new Error('failed validation');
    await new Transaction(transaction).save();

    const orders = [];
    transaction.cart.map(async (cartObj) => {
      // store order details to DB
      const order = {
        cartObj,
        bootpay: verifRes.data,
        buyer: transaction.buyer,
        seller: cartObj.item.owner._id,
        deliv: transaction.deliv,
      };
      const saveResult = await new Order(order).save();
      orders.push(saveResult._id);

      // decrement item opt qty
      decItemQty(cartObj.item._id, cartObj.optionsIndex, cartObj.quantity);
    });

    // empty cart
    const user = await User.findById(transaction.buyer);
    user.cart = [];
    await user.save();

    res.send({ orders });
  } catch (e) {
    const errData = {
      message: e.toString(),
      data: e.errors,
    };
    console.log('handle transaction error', errData);
    await new TransactionError(errData).save();
    res.status(500).send({ ...e, errData });
  }
});

module.exports = transactionRouter;
