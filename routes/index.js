const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send({
    active: true,
  });
});

router.use('/user', require('./userRouter'));
router.use('/item', require('./itemRouter'));
router.use('/shop', require('./shopRouter'));
router.use('/category', require('./categoryRouter'));
router.use('/file', require('./fileRouter'));
router.use('/transaction', require('./transactionRouter'));
router.use('/order', require('./orderRouter'));

module.exports = router;
