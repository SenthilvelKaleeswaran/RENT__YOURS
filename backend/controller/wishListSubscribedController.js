const {WishList} = require('../modules/wishListModules')

const getSingleUserWishList = async (req,res) => {
    try {

        const { id } = req.params
        console.log(req.params)

        const details = await WishList.findById(id) 

        res.status(201).send({details})
        
    } catch (error) {

        res.status(500).json({ msg:error})            
       
    }
}

const postUserWishList = async (req,res) => {

    try { 
        
        const {_id,users} = req.body
        console.log(req.body)

        
        const wishList = await WishList.create({  _id , users })


        res.status(201).send({ wishList })
        

    } 
    catch (error) {
        res.status(500).json({ msg:error})            
    }
}

const patchUserWishList = async (req,res) => {

    try { 
        
        const { id } = req.params
        console.log(req.params,req.body)

        
        const wishList = await WishList.findByIdAndUpdate(id,req.body)


        res.status(201).send({ wishList })
        

    } 
    catch (error) {
        res.status(500).json({ msg:error})            
    }
}




module.exports = {
    getSingleUserWishList,
    postUserWishList,
    patchUserWishList
  
}