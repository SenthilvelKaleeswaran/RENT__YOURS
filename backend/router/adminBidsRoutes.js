const express = require('express')
const adminBidsRouter = express.Router()

const {
    getAllBids,
    getSingleBid,
    postNewBidsAcquired,
    updateBidsAcquired,
    deleteBidsAcquired
} = require('../controller/adminBidsAcquiredController')

const {
    getAllAprovedBids,
    postAprovedBids,
    updateAprovedBids,
    deleteAprovedBids
} = require('../controller/adminBidsAprovedController')

adminBidsRouter.route('/bidsAcquired').get(getAllBids).post(postNewBidsAcquired)
adminBidsRouter.route('/bidsAcquired/:id').get(getSingleBid).patch(updateBidsAcquired).delete(deleteBidsAcquired)

adminBidsRouter.route('/bidsAproved').get(getAllAprovedBids).post(postAprovedBids)
adminBidsRouter.route('/bidsAproved/:id').patch(updateAprovedBids).delete(deleteAprovedBids)


module.exports = adminBidsRouter 
