const {Product} = require('../modules/adminModules')

const getAllProducts = async (req,res)=>{

    try {       
        const product = await Product.find({})
        res.status(201).json({ product })      
    } catch (error) {
        res.status(500).json({ msg:error })            
    }
}

const getSingleProduct = async (req,res)=>{

    try { 

        const {id} = req.params

        const products = await Product.findById(id)
        res.status(201).json({ products })      
    } catch (error) {
        res.status(500).json({ msg:error })            
    }
}

const postNewProduct = async (req,res)=>{

    try {       
        const product = await Product.create(req.body)
        res.status(201).json({ product })      
    } catch (error) {
        res.status(500).json({ msg:error })            
    }
}

const updateProduct = async (req,res)=>{

    try{
        const { id:productID } = req.params
        const product = await Product.findOneAndUpdate({ _id: productID },req.body)
        
        if(!product)
            return res.status(404).json({ msg: `No task with ID ${productID}` })
        
        res.status(200).json({ product })      
    
    } catch (error) {
        res.status(500).json({ msg : error })             
    }
}

const deleteProduct = async (req,res)=>{

    try {

        const { id:productID } = req.params
        const product = await Product.findOneAndDelete({ _id: productID })
        
        if(!product)
            return res.status(404).json({ msg: `No task with ID ${productID}` })
        
        res.status(200).json({ product })      
        
    } catch (error) {
        res.status(500).json({ msg : error })             
    }
}

module.exports = {
    getAllProducts,
    getSingleProduct,
    postNewProduct,
    updateProduct,
    deleteProduct
}