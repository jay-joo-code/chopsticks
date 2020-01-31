const transactionRouter = require('express').Router();
var BootpayRest = require('bootpay-rest-client');
const config = require('./../config');
const Transaction = require('./../models/Transaction');
const Order = require('./../models/Order');
const User = require('./../models/User');

BootpayRest.setConfig(config.BOOTPAY_REST_ID, config.BOOTPAY_PK);

// process transaction
transactionRouter.post('/:rid/process', async (req, res) => {
  try {
    const { rid } = req.params;
    const response = await BootpayRest.getAccessToken()
    if (response.status !== 200 || response.data.token === undefined) {
      throw new Error('access token error')
    }
    const verifRes = await BootpayRest.verify(rid)
    if (verifRes.status !== 200) {
      throw new Error('verification error')
    }
    
    // store transaction details to DB
    let { transaction } = req.body;
    transaction.bootpay = verifRes.data;
    const isValid = verifRes.data.price === transaction.price && verifRes.data.status === 1;
    if (!isValid) throw new Error('failed validation')
    await new Transaction(transaction).save();
    
    // store order details to DB
    let orders = [];
    transaction.cart.map(async (cartObj) => {
      const order = {
        cartObj,
        bootpay: verifRes.data,
        buyer: transaction.buyer,
        seller: cartObj.item.owner._id,
        deliv: transaction.deliv
      }
      const res = await new Order(order).save();
      orders.push(res._id);
    })
    
    // empty cart
    const user = await User.findById(transaction.buyer);
    user.cart = [];
    await user.save();
    
    res.send({ orders })
  }
  catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

transactionRouter.post('/:rid/cancel', async (req, res) => {
  try {
    
  } catch (e) {
    res.status(500).send(e)
  }
})

module.exports = transactionRouter;
