const mongoose = require('mongoose')


connectDB = (url) =>{

    mongoose 
    .connect(url)
    .then(()=>console.log("MONGODB CONNECTED"))
    .catch((error)=>console.log("MONGO DB ERROR ",error))
}

module.exports = connectDB
