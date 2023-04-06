const { BidsAcquired } = require('../modules/adminModules')

const getAllBids = async (req,res)=>{

    try {       
        const bidsAcquired = await BidsAcquired.find({})
        res.status(201).json({ bidsAcquired })      
    } catch (error) {
        res.status(500).json({ msg:error })            
    }
}

const getSingleBid = async (req,res)=>{

    try {  
        console.log("req----",req.params)
        const { id } = req.params
        const bidsAcquired = await BidsAcquired.findById(id)
        res.status(201).json({ bidsAcquired })      
    } catch (error) {
        res.status(500).json({ msg:error })            
    }



}

const postNewBidsAcquired = async (req,res)=>{

    try { 

        console.log(req.body)  

        const {_id,product,bid} = req.body
        
        const bidsAcquired = await BidsAcquired.create({_id,product,bid})
        res.status(201).json({ bidsAcquired }) 
    } catch (error) {
        // console.log("hey")     

        res.status(500).json({ msg:error })            
    }
}

const updateBidsAcquired = async (req,res)=>{

    try{
        const { id:bidsAcquiredID } = req.params
        const bidsAcquired = await BidsAcquired.findOneAndUpdate({ _id: bidsAcquiredID },req.body)
        
        if(!bidsAcquired)
            return res.status(404).json({ msg: `No task with ID ${bidsAcquiredID}` })
        
        res.status(200).json({ bidsAcquired })      
    
    } catch (error) {
        res.status(500).json({ msg : error })             
    }
}

const deleteBidsAcquired = async (req,res)=>{

    try {

        const { id } = req.params
        const bidsAcquired = await BidsAcquired.findByIdAndDelete(id)
        
        if(!bidsAcquired)
            return res.status(404).json({ msg: `No task with ID ${id}` })

        console.log('deleted')
        
        res.status(200).json({ bidsAcquired })      
        
    } catch (error) {
        res.status(500).json({ msg : error })             
    }
}

module.exports = {
    getAllBids,
    getSingleBid,
    postNewBidsAcquired,
    updateBidsAcquired,
    deleteBidsAcquired
}

