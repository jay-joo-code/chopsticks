// get an instance of mongoose and mongoose.Schema
const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');
const bcrypt = require('bcrypt');

var userSchema = Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    default: ''
  },
  displayImage: {
    type: String,
    default: ''
  },
  mobile: {
    type: String,
    default: ''
  },
  password: { //only email provider case has password
    type: String
  },
  provider: { //email, google, facebook
    type: String
  },
  cart: [{
    type: Schema.Types.ObjectId,
    ref: 'Item',
    default: []
  }],
  createdAt: {
    type: Date,
    default: new Date()
  },
  shop: {
    title: String,
    category: [String],
    intro: String,
    accepted: {
      type: Boolean,
      default: false
    },
    applied: {
      type: Boolean,
      default: false
    }
  }
});
/*
//signup only
userSchema.pre("save", function(next) {

  console.log("pre save is called : ", this.provider, this.password);

  if (this.provider === 'email') {
    bcrypt.hash(this.password, null, null, (err, hash) => {

      if (err) {
        console.log("err : ", err);
      }

      console.log("hash : ", hash);
      this.password = hash;


      const today = new Date;
      this.updated_at = today;
      if (!this.created_at) {
        this.created_at = today;
      }
      next();
    });
  }
  else {
    const today = new Date;
    this.updated_at = today;
    if (!this.created_at) {
      this.created_at = today;
    }
    next();
  }
});
*/
userSchema.methods.validatePassword = function(password, cb) {
  bcrypt.compare(password, this.password, cb);
};

userSchema.methods.validatePasswordSync = function(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.getPasswordSync = function(password) {
  return bcrypt.hashSync(password, null, null);
};

userSchema.plugin(mongoosePaginate);
// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('User', userSchema);
