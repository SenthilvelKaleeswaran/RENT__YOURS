import React, { useEffect, useState } from 'react'
import axios from 'axios'


function BitsAcquiredCard({list,approval,setApproval}) {

    
    console.log("list.product--->",list.product)

    const [editApproval, setEditApproval] = useState(false)



    const handleApproveClick =async (details,index)=>{

        details.approveToRent=true;
        console.log("detailsAfterAppproval--->",details)

        axios.post('http://localhost:8000/api/sv/admin/bid/bidsAproved',{

            "_id":list._id,
            "product":list.product,       
            "bid":list.bid
        })
        .then((response)=>{
            console.log("patch for detailsAfterApproval---->",list._id,list)

           
            
            const userID = localStorage.getItem('userId')
            axios.get(`http://localhost:8000/api/sv/user/userDetails/${userID}`)

            .then((response)=>{

                const userPreviousBitsAcquires = [...response.data.userDetails.approved,list._id]
                console.log("88888",userPreviousBitsAcquires)


                axios.patch(`http://localhost:8000/api/sv/user/userDetails/${userID}`,{
                    "approved":userPreviousBitsAcquires
                })
                .then(response =>{

                    console.log("-----after patch--------",response.data)


                    axios.patch(`http://localhost:8000/api/sv/admin/${list._id}`,{
                        "productAvailability": false
                    })

                    .then(response=>{

                        console.log('patched')
                        axios.delete(`http://localhost:8000/api/sv/admin/bid/bidsAcquired/${list._id}`)
                        .then((response)=>{
                            console.log("hey---------------------")
                            setApproval(!approval)}
                            )
        
                        .catch(error=>console.log(error))
                    })
                    .catch(error=>console.log(error))



                })

                .catch(error => console.log(error))
            })

            .catch(error=>console.log(error))          
        })
        
        .catch((error)=>console.log("bitsAcquired get error--->",error))
    }

    const handleEditApproval = ()=>{
        setEditApproval(true)

    }

    const bidSection = list.bid.map((x,index)=>(


                <tr>
                    <td>{x.bidderName}</td>
                    <td>{x.bidderBiddedAmount}</td>
                    <td>{x.bidderRequiredDays}</td>
                    <td>{x.fromDate}</td>
                    {/* <td>{x.toDate}</td> */}
                    <td>
                            <button onClick={()=>handleApproveClick(x,index)}>APPROVE</button>
                    </td>
                </tr>

            
    
    ))


    return (

        
            
                <div style={{display:"flex",flex:"row"}}>
                    <div>
                        <img src={list.product.productImageUrl} style={{height:"200px",width:"200px"}}/>
                        <p>PRICE : {list.product.productPrice}</p>
                        <p>CAN RENT FOR : {list.product.productAvailableDays} DAYS</p>
                    </div>
                    <table>
                        {bidSection}
                    </table> 
                </div>
                
            
        
        


           





            
        
    )
}

export default BitsAcquiredCard