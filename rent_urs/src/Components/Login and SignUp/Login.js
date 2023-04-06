import axios from "axios";

import React, { useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate()



  const handleSubmit = () => {

    axios.post('http://localhost:8000/api/sv/user/login',{

      "email":emailRef.current.value,
      "password":passwordRef.current.value

    })

    .then((response)=>{

      console.log(response.data)

      if(response.data.token)
      {

      localStorage.setItem("wishList", JSON.stringify(response.data.wishList));

      localStorage.setItem("jwt",response.data.token)
      localStorage.setItem("userId",response.data.userId)
      localStorage.setItem("approved",response.data.approved)
      // localStorage.setItem("wishList",response.data.wishList)

      console.log(response.data)


      emailRef.current.value = ""
      passwordRef.current.value = ""
      navigate('/products')
      }

      


    })
    
  }

  return (
    <div>
        
        <div>
            <label htmlFor="email">Email</label>
            <input
            type="email"
            id="email"
            ref={emailRef}
            required
            />
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input
            type="password"
            id="password"
            ref={passwordRef}
            required
            />
        </div>
        <button type="submit" onClick={handleSubmit}>Submit</button>
        
        <p>Need an account ? <NavLink to='/signup'>SIGNUP</NavLink> </p>
    </div>
   

  );
};

export default Login;
