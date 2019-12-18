const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send({
    active: true,
  });
});

router.use('/poll', require('./pollRouter'));
router.use('/user', require('./userRouter'));

module.exports = router;
