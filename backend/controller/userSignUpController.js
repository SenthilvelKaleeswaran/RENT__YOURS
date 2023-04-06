const bcrypt = require('bcrypt')
const sendEMail = require('./mailSignUp')


const {SignUp} = require('../modules/authModules')
const {UserDetail} = require('../modules/userModules')


const postUserSignUp = async (req,res)=>{

    try { 
        
        const {email,password} = req.body
        console.log(email,password)
        console.log(req.body)

        if(!email || !password)
        {
            console.log("hhh")
            return res.status(400).json({ msg:'provide signup details' })  

        }

        const salt = await bcrypt.genSalt(10);
        const cryptedPassword = await bcrypt.hash(password, salt);

        await SignUp.create({email:email, password: cryptedPassword })

        const newUserId = await SignUp.findOne({email})
        console.log(newUserId._id)
        
        await UserDetail.create({ _id:newUserId._id , email:email })

        res.status(201).send(true)
        
        await sendEMail(email,res)

    } 
    catch (error) {
        res.status(500).json({ msg:error})            
    }
}




module.exports = {
    postUserSignUp
  
}