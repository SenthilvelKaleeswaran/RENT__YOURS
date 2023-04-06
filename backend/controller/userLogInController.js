const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const {SignUp} = require('../modules/authModules');
const { UserDetail } = require('../modules/userModules');
 
const postUserLogIn = async (req,res)=>{

    try { 
        
        const {email,password} = req.body
        console.log(email,password)

        if(!email || !password)
            return res.status(400).json({ msg:'provide signin details' })

        const user = await SignUp.findOne({email:email})
        const userOtherWantedDetails = await UserDetail.findById(user._id)

        console.log(userOtherWantedDetails.approved)

        if(!user)
            return res.status(401).send('Invalid email')

        const isUserPassword = await bcrypt.compare(password,user.password)
        console.log(isUserPassword)

        if(!isUserPassword)
            return res.status(401).send('password wrong')

        const token = jwt.sign(email,'one')
        res.send({ token:token , userId:user._id , approved:userOtherWantedDetails.approved, wishList:userOtherWantedDetails.wishList })
        console.log(token)
    } 
    catch (error) {
        res.status(500).json({ msg:error})            
    }

}




module.exports = {
    
    postUserLogIn
  
}