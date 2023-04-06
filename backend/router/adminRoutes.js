const express = require('express')
const adminRouter = express.Router()
const {
    getAllProducts,
    getSingleProduct,
    postNewProduct,
    updateProduct,
    deleteProduct
} = require('../controller/adminProductController')



adminRouter.route('/').get(getAllProducts).post(postNewProduct)
adminRouter.route('/:id').get(getSingleProduct).patch(updateProduct).delete(deleteProduct)




module.exports = adminRouter