import React from 'react'
import { NavLink, Outlet} from 'react-router-dom'


function Admin() {


  return (
    <div>

        <NavLink to='products'>PRODUCTS</NavLink>
        <NavLink to='bitsAcquired'>BITS</NavLink>
        <NavLink to='rented'>RENTED</NavLink>
        <Outlet/> 

    </div>
  )
}

export default Admin


// JSON.stringify({
//     "id":products.id,
//     "dishName":dishName,
//     "price":parseInt(dishPrice),
//     "category":dishCategory,
//     "imageUrl":dishImageUrl
// })


// axios.post(
//     `http://localhost:8080/delete?id=${id}`,
    
    
// ).then((response)=>{
//     console.log(response.data);
//     new_Array.splice(index, 1);
//     setProducts(new_Array);
    
// }).catch((error)=>{
//     console.log(error);
// })

{/* 
                            // {editClick === items.id ?
                            //     (<EditableRow 
                            //         items={items} 
                            //         index={index}
                            //         handleCancelClickChange={handleCancelClickChange}
                            //         handleEditClickChange={handleEditClickChange}
                            //         handleRemoveClickChange={handleRemoveClickChange}
                            //         setEditClick={setEditClick}
                            //         editClick={editClick}
                            //     />
                            //     ) :
                            //     (<TableRow 
                            //         items={items}
                            //         index={index}
                            //         handleEditClickChange={handleEditClickChange}
                            //         handleRemoveClickChange={handleRemoveClickChange}
                            //         />
                            //     )
                            // } */}