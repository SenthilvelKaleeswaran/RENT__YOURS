import axios from 'axios'
import React, { useEffect, useState } from 'react'

function WishList() {

    const wishList = JSON.parse(localStorage.getItem('wishList'))
    const [items, setItems] = useState([])
    const [render,setRender] = useState(true)
    

    useEffect(()=>{
        const userID = localStorage.getItem('userId')

        Promise.all(wishList.map((x) => 
            axios.get(`http://localhost:8000/api/sv/admin/${x.productId}`)
            .then(response => response.data.products)
            .catch(error => console.log(error))
        ))
        .then(response => {
            setItems(response)
            
        })
        .catch(error => console.log(error))
    }, [render])
    console.log(wishList)


    const subscribeButtonCall = async(index) => {

        const userID = localStorage.getItem('userId')
        const productID = wishList[index].productID

        wishList[index].subscribe=true

        localStorage.setItem("wishList",JSON.stringify(wishList))
    

        await axios.patch(`http://localhost:8000/api/sv/user/userDetails/${userID}`,{

            "wishList" : wishList 

        })
        .then(response=> setRender(!render))
        .catch(error=>console.log(error))

        axios.post(`http://localhost:8000/api/sv/wishList`,{
            "_id":wishList[index].productId,
            "subscribedUsers":[userID]
        })
        .then(response=>console.log("new List new suscriber",response.data))
        .catch(error=>{
    
            
            axios.get(`http://localhost:8000/api/sv/wishList/${productID}`)
            .then(response=>{

                const updatedSubscribedUsers = [...response.data.details.subscribedUsers,userID]
                
                axios.patch(`http://localhost:8000/api/sv/wishList/${productID}`,{

                    subscribedUsers : updatedSubscribedUsers
                })
                .then(response=>{
                    console.log("response added",response.data)
                    setRender(!render)
                })
                .catch(error=>console.log(error))
            })
        })
    }


    const unSubscribeButtonCall = async(index) => {

        const userID = localStorage.getItem('userId')
        const productID = wishList[index].productId

        wishList[index].subscribe=false

        localStorage.setItem("wishList",JSON.stringify(wishList))
    
        axios.get(`http://localhost:8000/api/sv/wishList/${productID}`)
        .then(response=>{

            const updatedSubscribedUsers = [...response.data.details.subscribedUsers]
            const deleteIndex = updatedSubscribedUsers.findIndex((x)=>x===productID)
            updatedSubscribedUsers.splice(deleteIndex,1)
                
            axios.patch(`http://localhost:8000/api/sv/wishList/${productID}`,{

                subscribedUsers : updatedSubscribedUsers
            })
            .then(response=>{
                console.log("response added",response.data)
                setRender(!render)
            })
            .catch(error=>console.log(error))
        })
    }


    const list = items?.map((x,index)=>(
        <div key={x.productId}>
            <img src={x.productImageUrl} style={{height:"200px",width:'200px'}}/>
            <p>name:{x.productName}</p>
            <p>price:{x.productPrice}</p>
            <p>available days:{x.productAvailableDays}</p>
            <button>REMOVE</button>
            {
                wishList[index].subscribe ? 
                <button onClick={()=>unSubscribeButtonCall(index)}>UN SUBSCRIBE</button>
                :
                <button onClick={()=>subscribeButtonCall(index)}>SUBSCRIBE</button>


            }
            {/* <button onClick={subscribeButoncall}>SUBSCRIBE</button> */}
        </div>
    ))
    
    return (
        <div>{list}</div>
    )
}

export default WishList
