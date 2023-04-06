const mongoose = require('mongoose');

const wishListSchema = new mongoose.Schema({

  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  subscribedUsers : {
    type: [String],
    default: []
  }

});

module.exports = mongoose.model('WishList', wishListSchema);

