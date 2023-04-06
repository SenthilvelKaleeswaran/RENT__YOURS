import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { v4 as uuid } from 'uuid';
import RentedBidTable from './RentedBidTable';


function RentedCard({list,index,approval,setApproval}) {

    
    console.log("list.product--->",list.bid)

    const [flagYesNo, setFlagYesNo] = useState(false)
    const [editApproval, setEditApproval] = useState(false)
    const [makeChange,setMakeChange] = useState({
        "flag":false,
        "previousDetails":{},
        "currentDetails":{},
        "previousIndex":"",
        "currentIndex":""
    },[approval])

    console.log("makeChange-------",makeChange)

    useEffect(() => {

        
        list.bid.map((x,index)=>{
            if(x.approveToRent)
            setMakeChange({...makeChange,"previousDetails":x,"previousIndex":index})
            
        })
        
    }, [])
    
    const handleApproveClick = async(details,index) =>{
        setFlagYesNo(true)
        setMakeChange({...makeChange,"currentIndex":index,"currentDetails":details,"flag":true})
    }

    const handleNoClick = ()=>{
        setFlagYesNo(false)
        
    }


    const handleYesClick = ()=>{
        console.log(makeChange)
  
        list.bid[makeChange.previousIndex].approveToRent=false
        list.bid[makeChange.currentIndex].approveToRent=true
        console.log("listAfterApproval--->",list.bid)

        axios.patch(`http://localhost:8000/api/sv/admin/bid/bidsAproved/${list._id}`,{

            "bid":list.bid         
        })
        .then(async(response)=>{

            console.log("patch for --->",response.data.bid)

            const previousUserID = makeChange.previousDetails.bidderId
            await axios.get(`http://localhost:8000/api/sv/user/userDetails/${previousUserID}`)

            .then((response)=>{

                    console.log("check*********",makeChange)
                    const userPreviousBitsAcquires = [...response.data.userDetails.approved]
                    const deleteIndex=userPreviousBitsAcquires.findIndex((userPreviousBitsAcquires)=>userPreviousBitsAcquires===list._id)
                    response.data.userDetails.approved.splice(deleteIndex,1)

                    console.log(response.data.userDetails.approved)

                    axios.patch(`http://localhost:8000/api/sv/user/userDetails/${previousUserID}`,{
                        "approved":response.data.userDetails.approved
                    })                    
                    .then((response)=>{

                        const currentUserID = makeChange.currentDetails.bidderId

                        axios.get(`http://localhost:8000/api/sv/user/userDetails/${currentUserID}`)
                        .then(response=>{

                            const updatedNewUserBidsAcquired = [...response.data.userDetails.approved,list._id]

                            axios.patch(`http://localhost:8000/api/sv/user/userDetails/${currentUserID}`,{
                            "approved":updatedNewUserBidsAcquired
                            })
                            .then(response =>{                             
                                    setApproval(!approval)
                                    console.log("----updated-----")
                            })
                            .catch(error=>console.log(error))

                        })

                    })
                    .catch(error=>console.log(error))
            })

            .catch(error=>console.log(error))

            

            setApproval(true)
            setEditApproval(false)
            setFlagYesNo(false)
            setMakeChange({...makeChange,
                "previousDetails":makeChange.currentDetails,
                "previousIndex":makeChange.currentIndex,
                "currentDetails":{},
                "currentIndex":""
            })
            console.log(makeChange)
            
        })
        .catch((error)=>console.log("bitsAcquired get error--->",error))

    }

    const handleDeclineClick = ()=>{

        list.bid[makeChange.previousIndex].approveToRent=false

        axios.post('http://localhost:8000/api/sv/admin/bid/bidsAcquired',{

            "_id":list._id,
            "product":list.product,       
            "bid":list.bid
        })
        .then((response)=>{

            
            const userID = makeChange.previousDetails.bidderId
            axios.get(`http://localhost:8000/api/sv/user/userDetails/${userID}`)
                        
            .then((response)=>{
                
                    console.log("check*********",makeChange)
                    const userPreviousBitsAcquires = [...response.data.userDetails.approved]


                    const deleteIndex=userPreviousBitsAcquires.findIndex((userPreviousBitsAcquires)=>userPreviousBitsAcquires===list._id)
                    // console.log(deleteIndex)
                    response.data.userDetails.approved.splice(deleteIndex,1)
                    console.log(response.data.userDetails.approved)

                    axios.patch(`http://localhost:8000/api/sv/user/userDetails/${userID}`,{
                        "approved":response.data.userDetails.approved
                    })
                    .then((response)=>{

                        axios.patch(`http://localhost:8000/api/sv/admin/${list._id}`,{
                            "productAvailability": true
                        })

                        .then(response=>{

                            axios.delete(`http://localhost:8000/api/sv/admin/bid/bidsAproved/${list._id}`)

                            .then((response)=>{
                                setApproval(!approval)
                                console.log("first--------------------------")
                            })
    
                            .catch(error=>console.log(error))

                        })
                        .catch(error=>console.log(error))


                       

                    })
                    .catch(error=>console.log(error))
                    
       

            })

            .catch(error=>console.log(error))


        })
        .catch((error)=>console.log("bitsAcquired get error--->",error))

    }

    const handleEditClick = ()=>{
        setEditApproval(true)
    }

    const handleCancelClick = ()=>{
        setEditApproval(false)
    }

    const handleUpdateClick = ()=>{
    }



    

    
   


    return (

        
        
                <div style={{display:"flex",flex:"row",justifyContent:'space-around'}}>
                    
                    <div>
                        <img src={list.product.productImageUrl} style={{height:"200px",width:"200px"}}/>
                        <p>PRICE : {list.product.productPrice}</p>
                        <p>CAN RENT FOR : {list.product.productAvailableDays}</p>

                    </div>

                    <table>
                        {
                            list.bid.map((row,index)=>
                                <RentedBidTable 
                                    list={row}
                                    makeChange={makeChange} 
                                    approval={list.approval}
                                    setMakeChange={setMakeChange}
                                    editApproval={editApproval} 
                                    handleApproveClick={handleApproveClick} 
                                    index={index}
                                />
                            )
                        }
                    </table>

                    {editApproval ?
                        <div>
                            <button  onClick={handleCancelClick} style={{height:'20px'}}>CANCEL</button>
                            {flagYesNo ?
                                <div>
                                    <p>ARE YOU WANT TO MAKE CHANGE?</p>
                                    <button onClick={handleYesClick}>Yes</button>
                                    <button onClick={handleNoClick}>No</button>
                                </div> 
                                :
                                ""
                            }
                            
                        </div>

                        :
                        <div>
                            <button  onClick={handleEditClick} style={{height:'20px'}}>EDIT</button>
                            <button  onClick={handleDeclineClick} style={{height:'20px'}}>DECLINE</button>
                        </div>
                    }

                </div>
            
        
    )
}

export default RentedCard