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

module.exports = router;
