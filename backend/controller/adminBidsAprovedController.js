const { BidsAproved } = require('../modules/adminModules')

const getAllAprovedBids = async (req,res)=>{

    try {       
        const bidsAproved = await BidsAproved.find({})
        res.status(201).json({ bidsAproved })      
    } catch (error) {
        res.status(500).json({ msg:error })            
    }
}

const postAprovedBids= async (req,res)=>{

    try { 

        const bidsAproved = await BidsAproved.create(req.body)
        console.log(bidsAproved)
        res.status(201).json({ bidsAproved }) 
    } catch (error) {
        console.log(error)    

        res.status(500).json({ msg:error })            
    }
}

const updateAprovedBids = async (req,res)=>{

    try{
        const { id } = req.params

        const { bid } = req.body
        const bidsAproved = await BidsAproved.findOneAndUpdate(id , {bid})
        
        // if(!bidsAcquired)
        //     return res.status(404).json({ msg: `No task with ID ${bidsAcquiredID}` })
        
        res.status(200).json({ bidsAproved })      
    
    } catch (error) {
        res.status(500).json({ msg : error })             
    }
}

const deleteAprovedBids = async (req,res)=>{

    try {

        const { id } = req.params
        // console.log(id)

        const bidsAproved =  await BidsAproved.findByIdAndDelete(id)
        // console.log(bidsAproved)

        // if(!bidsAcquired)
        //     return res.status(404).json({ msg: `No task with ID ${id}` })

        console.log('deleted')
        
        res.status(200).send({bidsAproved})     
        
    } catch (error) {
        res.status(500).json({ msg : error })             
    }
}



module.exports = {
    getAllAprovedBids,
    postAprovedBids,
    updateAprovedBids,
    deleteAprovedBids

}

