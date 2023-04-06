const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        productName : String,
        productPrice : {
            type:Number,
            required:true
        },
        productAvailableDays: Number,
        productCategory : String,
        productAvailability: Boolean,
        productImageUrl: String
    },
    {
        required : true,
        trim:true
    }
)



module.exports = productSchema