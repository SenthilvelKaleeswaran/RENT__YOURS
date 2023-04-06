import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

function NavBar() {
  const navigate = useNavigate()
  return (
    <div style={{width:'100%',display:'flex',flex:'row'}}>   
        <NavLink to=''>HOME</NavLink>
        <NavLink to='/products'>PRODUCTS</NavLink>
        <NavLink to='/bits'>BITS</NavLink>     
        <NavLink to='/wishlist'>WISHLIST</NavLink>     
        <NavLink to='/login'>LOGIN</NavLink>
        <NavLink to="/signup">SIGN UP</NavLink>
        <NavLink to="/admin">ADMIN</NavLink>
        <button onClick={()=>{
          localStorage.setItem('jwt','')
          localStorage.setItem('userId','')
          localStorage.setItem('wishList','')
          localStorage.setItem('approved','')
          navigate('/login')

        }}>LOGOUT</button>
        
        
    </div>
    
  )
}

export default NavBar