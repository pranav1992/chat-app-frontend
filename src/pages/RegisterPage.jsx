import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: "",
  });
  const [uploadPhoto, setUploadPhoto] = useState("");
  const navigate = useNavigate()
  const handleOnChange = (e) => {
    console.log("handle on change ==> ",e.target)
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleUploadPhoto = (e) => {
    const file = e.target.files[0];
    setUploadPhoto(file);
    console.log("profile photo", file);
  };
  const handleClearUploadPhoto = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setUploadPhoto("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const URL = "http://127.0.0.1:8080/api/register"
    try {
      const response = await axios.post(URL, data)
      toast.success(response.data.message)
      if(response.data.success = "true"){
        setData({name:"",email:"",password:"",profile_pic:""})
        navigate("/email")
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
      
    }
   
  };
  return (
    <div className="mt-5">
      <div className="bg-white w-full max-w-screen-sm rounded overflow-hidden p-4 mx-auto">
        <h3>Welcome Chat App</h3>
        <form className="grid gap-4 mt-5" onSubmit={handleSubmit}>

          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name : </label>
            <input
              value={data.name}
              onChange={handleOnChange}
              type="text"
              id="name"
              name="name"
              placeholder="enter your name"
              className="bg-slate-50 py-1 focus:outline-primary"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="name">Email : </label>
            <input
              value={data.email}
              onChange={handleOnChange}
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              className="bg-slate-50 py-1 focus:outline-primary"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password">password : </label>
            <input
              value={data.password}
              onChange={handleOnChange}
              type="text"
              id="password"
              name="password"
              placeholder="Password"
              className="bg-slate-50 py-1 focus:outline-primary"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="profile_pic">
              Photo :
              <div className=" h-14 bg-slate-200 flex justify-center items-center border rounded hover:border-primary cursor-pointer">
                <p className="text-sm max-[200] text-ellipsis line-clamp-1">
                  {uploadPhoto?.name
                    ? uploadPhoto?.name
                    : "Upload Profile Photo"}
                </p>
                {uploadPhoto?.name && (
                  <button
                    className="text-lg ml-2 hover:text-red-600"
                    onClick={handleClearUploadPhoto}
                  >
                    <IoClose />
                  </button>
                )}
              </div>
            </label>
            <input
              type="file"
              id="profile_pic"
              name="profile_pic"
              onChange={handleUploadPhoto}
              className="bg-slate-50 px-2 py-1 focus:outline-primary hidden"
            />
          </div>

          <button className="bg-primary text-lg px-4 py-1 hover:bg-secondary mt-2 font-bold leading-relaxed tracking-wide">
            Register
          </button>

          {/* <div className="flex flex-col gap-1">
            <label htmlFor="profile_pic">Photo : </label>
            <input type="file" id="profile_pic" name="profile_pic"  className="bg-slate-50 py-1 focus:outline-primary" />
          </div> */}
        </form>

        <p className="my-3 text-center">Already Have An Account ? <Link to={"/email"} className="hover:text-primary hover:underline">Login</Link></p>
      </div>
    </div>
  );
}
