import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { PiUserCircle } from "react-icons/pi";
import { useDispatch } from 'react-redux';
import { setToken,setUser } from '../redux/slices/userSlice';


export default function CheckPasswordPage() {
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  useEffect(()=>{
    if(!location?.state?.name){
      navigate('/email')
    }},[])

  const handleOnChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const URL = "http://127.0.0.1:8080/api/password"
    try {
      const response = await axios({method:'post', url: URL, data: {
        userId: location?.state?._id,
        password: password
      },
      withCredentials : true
    })
      toast.success(response.data.message)
      if(response.data.success = "true"){
        dispatch(setToken(response?.data?.token))
        localStorage.setItem('token',response?.data?.token)
        setPassword("")
        navigate("/")
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
            <label htmlFor="name">Password : </label>
            <input
              value={password}
              onChange={handleOnChange}
              type="text"
              id="password"
              placeholder="Enter your password"
              name='password'
              className='bg-slate-100 px-2 py-1 focus:outline-primary'
              required
              
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
        {/* <p className="my-3 text-center"><Link to={"/forget-password"} className="hover:text-primary hover:underline">Forget Password</Link></p> */}
      </div>
    </div>
  );
}

