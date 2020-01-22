const userRouter = require('express').Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('./../models/User');

const SALT = 10;

// LOGIN
userRouter.post('/login', passport.authenticate('local'), (req, res) => {
  res.send(req.user);
});

// LOGOUT
userRouter.post('/logout', (req, res) => {
  req.logout();
  res.send({ success: true });
});

// GET ALL Users
userRouter.get('/', async (req, res) => {
  try {
    const result = await User.find({});
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});

// GET User BY ID
userRouter.get('/:id', async (req, res) => {
  try {
    const result = await User.findById(req.params.id).populate('cart.item');
    console.log('get user by id', result);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});

// CREATE User
userRouter.post('/create', async (req, res) => {
  try {
    // HASH PWD
    const hash = bcrypt.hashSync(req.body.password, SALT);

    const data = {
      ...req.body,
      password: hash,
    };

    const doc = new User(data);
    const result = await doc.save();
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});

// ADD ITEM TO CART
userRouter.post('/:id/cart/add', async (req, res) => {
  try {
    const { cartObj } = req.body;
    let user = await User.findById(req.params.id);
    const existingObj = user.cart.filter((obj) => {
      return obj.item.toString() === cartObj.item
    });
    
    const hasCartObj = existingObj.length > 0;
    let newCart;
    if (!hasCartObj) {
      // ADD NEW CARTOBJ
      newCart = user.cart;
      newCart.push(cartObj);
    } else {
      // INCREMENT QUANTITY OF EXISTING CARTOBJ
      newCart = user.cart.map((obj) => {
        if (obj.item.toString() === cartObj.item) {
          obj.quantity += 1;
        }
        return obj;
      })
    }
    user.cart = newCart;
    await user.save();
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
})

/* CLIENT CREATE REQUEST */
userRouter.post('/client', async (req, res) => {
  try {
    const generatedData = {
      isReviewed: false,
    };
    const mergedData = { ...req.body, ...generatedData };
    const doc = new User(mergedData);
    const result = await doc.save();
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = userRouter;
