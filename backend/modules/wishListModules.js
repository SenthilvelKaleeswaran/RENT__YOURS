const mongoose = require('mongoose')

const { wishListSchema } = require('./wishlist/wishList')


module.exports = {
    
    WishList :mongoose.model('WishList',wishListSchema),

}
