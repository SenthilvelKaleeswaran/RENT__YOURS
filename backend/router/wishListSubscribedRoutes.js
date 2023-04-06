const express = require('express')
const wishListRouter = express.Router()


const {
    postUserWishList,
    patchUserWishList,
    getSingleUserWishList
} = require('../controller/wishListSubscribedController')



wishListRouter.route('/').post(postUserWishList)
wishListRouter.route('/:id').get(getSingleUserWishList).patch(patchUserWishList)
// wishListRouter.route('/product/:id').patch(patchUserWishList)


module.exports = wishListRouter