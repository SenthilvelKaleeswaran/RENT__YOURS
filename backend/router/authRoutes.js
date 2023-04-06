const express = require('express')
const authRouter = express.Router()


const {
    postUserSignUp
} = require('../controller/userSignUpController')

const {
    postUserLogIn
} = require('../controller/userLogInController')

authRouter.route('/login').post(postUserLogIn)
authRouter.route('/signup').post(postUserSignUp)





module.exports = authRouter