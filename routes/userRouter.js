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
    const result = await User.findById(req.params.id).populate({
      path: 'cart.item',
      populate: {
        path: 'owner'
      }
    });
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
      const isSameItem = obj.item.toString() === cartObj.item;
      const hasSameOptions = obj.optionsIndex === cartObj.optionsIndex;
      return isSameItem && hasSameOptions;
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

// UPDATE OR DELETE EXISTING CARTOBJ
userRouter.put('/:id/cart/:operation/cartobj', async (req, res) => {
  try {
    const { cartObj, removeIds } = req.body;
    const { id, operation } = req.params;
    const user = await User.findById(id);
    
    let newCart;
    if (operation === 'update') {
      newCart = user.cart.map((existingCartObj) => {
        const isTargetCartObj = existingCartObj._id.toString() === cartObj._id.toString();
        if (isTargetCartObj) {
          return cartObj;
        } 
        return existingCartObj;
      })
    } else if (operation === 'delete') {
      newCart = user.cart.filter((existingCartObj) => {
        const isTargetCartObj = existingCartObj._id.toString() === cartObj._id.toString();
        return !isTargetCartObj;
      })
    } else if (operation === 'delete-many') {
      newCart = user.cart.filter((existingCartObj) => {
        const isTargetCartObj = removeIds.includes(existingCartObj._id.toString());
        return !isTargetCartObj;
      })
    }
    
    user.cart = newCart;
    const result = await user.save();
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
})

module.exports = userRouter;
