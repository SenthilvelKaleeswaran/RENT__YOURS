import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { v4 as uuid } from 'uuid';
import TableRow from './TableRow';
import { useNavigate } from 'react-router-dom';
import { ProductsLoader } from '../../Context/Context';


function AdminProducts() {

    const navigate=useNavigate()

    const contextImporter = useContext(ProductsLoader)


    const [addNewProduct,setAddNewProduct]=useState([{
        productName:"",
        productPrice:"",
        productAvailableDays:"",
        productCategory:"",
        productImageUrl:"",
        productAvailability:true
    }]);

    const [postError, setPostError] = useState(false)


    console.log("contextimporter.products",contextImporter.products)
    console.log("contextimporter.setEditClick",contextImporter.editClick)
    console.log("contextimporter.setAdd",contextImporter.add)
 

    // useEffect(()=>{

    //     axios.get('http://localhost:3500/products')

    //     .then((response)=>{
    //         console.log('response----',response.data);
    //         setProducts(response.data)   
    //     })
        
    //     .catch((error)=>console.log(error))
        
    // },[add,editClick])

  

    const handleAddNewProductCall = (event)=>{
        const name = event.target.name
        const value = event.target.value

        setAddNewProduct({
            ...addNewProduct,
            [name]:value
        })

        console.log(addNewProduct)
    }


    
    const handleAddProductSubmit = () =>{
        
        axios.post("http://localhost:8000/api/sv/admin/",{

            "id":uuid(),
            "productName":addNewProduct.productName,
            "productPrice":addNewProduct.productPrice,
            "productAvailableDays":addNewProduct.productAvailableDays,
            "productCategory":addNewProduct.productCategory,
            "productImageUrl":addNewProduct.productImageUrl,
            "productAvailability":true,        
        })  

        .then((response)=>{
            contextImporter.setAdd(!contextImporter.add)
            setAddNewProduct({
                productName:"",
                productPrice:"",
                productAvailableDays:"",
                productCategory:"",
                productImageUrl:"",
                productAvailability:true
            })
            
        })

        .catch((error)=>setPostError(true))
    }



    const handleSaveClickChange = (_id,editedProduct,checkBox)=>{    
        
        axios.patch(`http://localhost:8000/api/sv/admin/${_id}`,
            {
                "id":editedProduct.id,
                "productName":editedProduct.productName,
                "productPrice":editedProduct.productPrice,
                "productAvailableDays":editedProduct.productAvailableDays,
                "productCategory":editedProduct.productCategory,
                "productImageUrl":editedProduct.productImageUrl,
                "productAvailability":checkBox,             
            },
            
        )
        
        .then((response)=>{
            console.log(response.data)
            contextImporter.setEditClick({"id":-1,"flag":false})   
        })
        
        .catch((error)=>console.log(error))
    }
    
    

    const handleEditClickChange =(event,products) => {

        event.preventDefault();
        contextImporter.setEditClick({"id":products._id,"flag":true})

        const newField = {

            "id":products.id,
            "productName":products.productName,
            "productPrice":products.productPrice,
            "productAvailableDays":products.productAvailableDays,
            "productCategory":products.productCategory,
            "productImageUrl":products.productImageUrl,
            "productAvailability":products.productAvailability,        
            
        }

        console.log("handleEditClickChange",newField)

        // setEditProducts(new_field);

        // axios.post(
        //      'http://localhost:8080/modify',
        //     //'http://localhost:3500/books',
        //     JSON.stringify({
        //         "id": products.key,
        //         "dishName":products.dishName,
        //         "price":products.price,
        //         "category":products.category,
        //         "imageUrl":products.imageUrl
        //         "availability":products.availability,
        //     }),
        //     {
        //         // headers:{
        //         //     'Content-Type':'application/json'
                    
        //         // }
        //     }
        // ).then((response)=>{
            
        //     console.log(response.data);
            
        // }).catch((error)=>{
        //     console.log(error);
        // })
    }
    console.log("^^^^^^^^^^^^^^^^^^^",typeof contextImporter.products);
    // contextImporter.products.map(...);
    


    const handleRemoveClickChange = (_id,index) => {

        const new_Array = [...contextImporter.products];
        console.log("______________id",_id,new_Array)
        // const index = products.findIndex((products) => products.id === id);
     
        axios.delete(`http://localhost:8000/api/sv/admin/${_id}`)
        .then((response)=>{
            console.log(response.data);
            new_Array.splice(index, 1);
            contextImporter.setProducts(new_Array);     
        })

        .catch((error)=>console.log(error))
         
    }



    const handleCancelClickChange = () => {
        contextImporter.setEditClick({"id":-1,"flag":false});
    }



    const handleLogOut=()=>{

        axios.post(
            'http://localhost:8080/logout',
            {
                headers:{
                    'Authorization':'Bearer '+localStorage.getItem('jwt')
                }
            }
        ).then(
            ()=>{
                console.log('logged out')
                localStorage.setItem('jwt',"");
                navigate('../nav/home');
            }
        )
    }


   
  return (
    <div className='Admin_Panel'>
        
            <div id='top'></div>

            {postError ? <div>error</div> : ""}

            <br></br>
            <br></br>

            <div  className='form_add_field'>
                
                <input 
                    id='input_field' type='text' placeholder='ENTER PRODUCT NAME'    
                    name='productName'        
                    value={addNewProduct.productName}        
                    onChange={handleAddNewProductCall}
                    required  
                />

                <input 
                    id='input_field' type='text' placeholder='ENTER PRICE'
                    name='productPrice'    
                    onChange={handleAddNewProductCall}
                    value={addNewProduct.productPrice}        
                    required
                />

                <input 
                    id='input_field' type='text' placeholder='ENTER AVAILABLE DAYS'       
                    name='productAvailableDays'
                    onChange={handleAddNewProductCall}
                    value={addNewProduct.productAvailableDays}
                    // required
                />

                <select
                    id='input_field'  placeholder='CATEGORY' 
                    name='productCategory'               
                    onChange={handleAddNewProductCall}
                    value={addNewProduct.productCategory}        
                    // required
                >
                    <option value='' hidden>CATEGORY</option>
                    <option>MACHINERY</option>
                    <option>ELECTRICALAPPLIANCES</option>
                    

                </select>
    
                <input 
                    id='input_field' type='text' placeholder='ENTER IMAGE URL'       
                    name='productImageUrl'
                    onChange={handleAddNewProductCall}
                    value={addNewProduct.productImageUrl}
                    // required
                />
            
                <button onClick={handleAddProductSubmit} type='submit' id='button__add'>ADD</button>
                <br></br>

            </div>

            <br></br>
            <br></br>

            {/* <div className='button_top'>
                <IconButton href='#top'>
                    <ExpandLess style={{backgroundColor:'black',color:'white',padding:'10px',fontSize:'24px',borderRadius:'50%',position:'fixed',bottom:'20px',right:'20px'}}/>
                </IconButton>
            </div>  */}


            <table  className='admin_table'>

                <thead className ='admin_table_head'>
                    <tr>
                    <td id='admin_table_head'>S.NO</td>
                    <td id='admin_table_head'>NAME</td>
                    <td id='admin_table_head'>PRICE</td>
                    <td id='admin_table_head'>DAYS</td>
                    <td id='admin_table_head'>CATEGORY</td>
                    <td id='admin_table_head'>AVAILABLE</td>
                    <td id='admin_table_head'>IMAGE URL</td>
                    <td id='admin_table_head_action'>ACTIONS</td>
                    </tr>
                </thead>

                <tbody>
                    
                    {contextImporter.products.map((items,index)=>(
                        <>
                                { <TableRow 
                                    items={items} 
                                    index={index}
                                    editClick={contextImporter.editClick} 
                                    handleSaveClickChange={handleSaveClickChange}
                                    handleEditClickChange={handleEditClickChange}
                                    handleCancelClickChange={handleCancelClickChange}
                                    handleRemoveClickChange={handleRemoveClickChange}
                                  />
                                }   
                            
                        </>


                    ))}

                </tbody>
                
            </table>

        </div>
  )
}

export default AdminProducts