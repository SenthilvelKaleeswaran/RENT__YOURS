import React from 'react'
import { NavLink } from 'react-router-dom'
import { v4 as uuid } from 'uuid';


function Home() {
  const arr=[]
  for(var i=0;i<14;i++)
  {
    arr.push(uuid())

  }
  console.log(arr)
  return (
    <div>
       <p> Be a owner for a while !</p>
       <p>Take me to <NavLink to='/products'>PRODUCTS</NavLink> page</p>
    </div>
  )
}

export default Home