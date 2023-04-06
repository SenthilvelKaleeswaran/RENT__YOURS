const mongoose = require('mongoose')

const productSchema = require('./admin/product')
const bidsAcquiredSchema = require('./admin/bidsAcquired')
const bidsAprovedSchema= require('./admin/bidsAproved')


module.exports = {
    
    Product :mongoose.model('Product',productSchema),
    BidsAcquired : mongoose.model('BidsAcquired', bidsAcquiredSchema),
    BidsAproved : mongoose.model('BidsAproved', bidsAprovedSchema)

}
