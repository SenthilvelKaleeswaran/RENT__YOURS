const mongoose = require('mongoose');

const userDetailSchema = new mongoose.Schema({


    _id: {

        type: mongoose.Schema.Types.ObjectId,
        required: true

    },

    email: {

        type: String,
        required: true,
        unique: true,

    },

    userName: {

        type: String
    },

    phoneNo: {

        type: Number

    },

    address : {

        type: String

    },

    approved : {

        type: Array
    },

    wishList : [
        {
            _id: false,
            productId: {
              type: mongoose.Schema.Types.ObjectId,
              required: true
            },
            subscribe: {
              type: Boolean,
              default: false
            }
          }
    ]
    




});


module.exports = userDetailSchema;
