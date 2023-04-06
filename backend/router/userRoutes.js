const express = require('express')
const userRouter = express.Router()


const {
    getUserDetails,
    patchUserDetails
} = require('../controller/userDetailsController')



userRouter.route('/userDetails/:id').get(getUserDetails).patch(patchUserDetails)


module.exports = userRouter