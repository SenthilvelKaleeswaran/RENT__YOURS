import React, { useRef } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'




function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const navigate = useNavigate();



  const handleSubmitCall = () => {

    if(passwordRef.current.value === confirmPasswordRef.current.value)
    {
      handleSubmit()

    }
   
    




  }

  const handleSubmit = (event) => {

    axios.post('http://localhost:8000/api/sv/user/signup',{

      "email":emailRef.current.value,
      "password":confirmPasswordRef.current.value

    })

    .then((response)=>{
      if(response.data)
      {
        navigate('/login')
        console.log(response.data)
        console.log("sucess")

        
      }
    })
    
  }

  return (
    <div>
      <label htmlFor="email">Email:</label>
      <input type="text" id="email" ref={emailRef} />
      <br></br>

      <label htmlFor="password">Password:</label>
      <input type="password" id="password" ref={passwordRef} />
      <br></br>

      <label htmlFor="confirm-password">Confirm Password:</label>
      <input type="password" id="confirm-password" ref={confirmPasswordRef} />
      <br></br>

      <button type="submit" onClick={handleSubmitCall}>Sign Up</button>
    </div>
  );
}

export default SignUp;
