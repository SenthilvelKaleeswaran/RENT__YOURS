const mongoose = require('mongoose')

const userDetailSchema = require('./user/userDetails')


module.exports = {
    
    UserDetail :mongoose.model('UserDetail',userDetailSchema),

}
