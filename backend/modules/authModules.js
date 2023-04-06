const mongoose = require('mongoose')

const { userSignUpSchema } = require('./auth/userSignUp')


module.exports = {
    
    SignUp :mongoose.model('SignUp',userSignUpSchema),

}
