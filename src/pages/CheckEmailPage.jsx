import React, { useState } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { PiUserCircle } from "react-icons/pi";

export default function CheckEmailPage() {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()
  const handleOnChange = (e) => {
    setEmail(e.target.value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const URL = "http://127.0.0.1:8080/api/email"
    try {
      const response = await axios.post(URL, {email: email})
      toast.success(response.data.message)
      if(response.data.success = "true"){
        // setEmail('')
        navigate("/password", {
          state: response.data.data
        })
      }
    } catch (error) {
      console.log("response ==> ", error)
      toast.error(error?.response?.data?.message)
      
    }
   
  };
  return (
    <div className="mt-5">
      <div className="bg-white w-full max-w-screen-sm rounded overflow-hidden p-4 mx-auto">
        <div className='w-fit mx-auto mb-2'><PiUserCircle size={80} /></div>
        <h3>Welcome Chat App</h3>
        <form className="grid gap-4 mt-3" onSubmit={handleSubmit}>

          <div className="flex flex-col gap-1">
            <label htmlFor="name">Email : </label>
            <input
              value={email}
              onChange={handleOnChange}
              type="text"
              id="email"
              placeholder="Email"
              className="bg-slate-50 py-1 focus:outline-primary"
            />
          </div>


    
          <button className="bg-primary text-lg px-4 py-1 hover:bg-secondary mt-2 font-bold leading-relaxed tracking-wide">
            Login
          </button>

          {/* <div className="flex flex-col gap-1">
            <label htmlFor="profile_pic">Photo : </label>
            <input type="file" id="profile_pic" name="profile_pic"  className="bg-slate-50 py-1 focus:outline-primary" />
          </div> */}
        </form>

        <p className="my-3 text-center">New User? <Link to={"/register"} className="hover:text-primary hover:underline">Register</Link></p>
      </div>
    </div>
  );
}


