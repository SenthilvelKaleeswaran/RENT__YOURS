const mongoose = require('mongoose');


const bidSchema = new mongoose.Schema({

        _id :false,

        bidderId: {
            type: mongoose.Schema.Types.ObjectId,
            unique:true,
            required: true,
        },

        bidderName: {
            type: String,
            required: true,
            trim: true
        },

        bidderBiddedAmount: {
            type: Number,
            required: true
        },

        bidderRequiredDays: {
            type: Number,
            required: true
        },

        fromDate: {
            type: Date,
            required: true
        },

        toDate: {
            type: Date,
            required: true
        },

        approveToRent: {
            type: Boolean,
            required: true,
            default: false
        }
});

const productSchema = new mongoose.Schema({

        _id : false,

        productPrice: {
            type: Number,
            required: true
        },

        productAvailableDays: {
            type: Number,
            required: true
        },

        productImageUrl: {
            type: String,
            required: true,
            trim: true
        }
});

const bidsAcquiredSchema = new mongoose.Schema({
    
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },

        product: {
            type: productSchema,
            required: true
        },

        bid: {
            type: [bidSchema],
            required: true
        }
});


module.exports = bidsAcquiredSchema;
