const express = require('express')
const app = express()

const cors = require('cors')

require('dotenv').config()

const connectDB = require('./db/connect')
const adminRouter = require('./router/adminRoutes')
const adminBidsRouter = require('./router/adminBidsRoutes')
const authRouter = require('./router/authRoutes')
const userRouter = require('./router/userRoutes')
const wishListRouter = require('./router/wishListSubscribedRoutes')

//middleware
app.use(express.json())
app.use(cors())


//routes
app.use('/api/sv/admin',adminRouter)
app.use('/api/sv/admin/bid',adminBidsRouter)
app.use('/api/sv/user',authRouter)
app.use('/api/sv/user',userRouter)
app.use('/api/sv/wishList',wishListRouter)




const PORT = 8000

const startNode = async()=>{
    try {

        await connectDB(process.env.MONGO_URL)
        app.listen(PORT,console.log("SERVER IS RUNNING IN ...",PORT))

        
    } catch (error) {

        console.log("startNode ERROR",error)
        
    }
}

startNode()
