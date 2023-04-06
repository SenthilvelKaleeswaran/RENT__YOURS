const {UserDetail} = require('../modules/userModules')
 
const getUserDetails = async (req,res)=>{

    try { 
        
        const { id} = req.params

        console.log(id)

        if(!id)
            return res.status(400).json({ msg:'no user found ' })

        const user = await UserDetail.findById(id)

        console.log(user)

        if(!user)
            return res.status(401).send('Invalid user')

        
        res.status(200).send({ userDetails : user })
    
    } 
    catch (error) {
        res.status(500).json({ msg:error})            
    }

}

const patchUserDetails = async (req,res)=>{

    try { 
        
        const { id } = req.params
        const {  } = req.body


        console.log(req.params,req.body)

        if(!id)
            return res.status(400).json({ msg:'no user found ' })

        const user = await UserDetail.findByIdAndUpdate(id , req.body , {new :true})

        console.log(user)

        if(!user)
            return res.status(401).send('Invalid user')

        
        res.send({ userDetails : user })
    
    } 
    catch (error) {
        res.status(500).json({ msg:error})            
    }

}




module.exports = {
    
    getUserDetails,
    patchUserDetails
  
}