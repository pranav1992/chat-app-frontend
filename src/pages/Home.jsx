import axios from "axios";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, setOnlineUser, setSocketConnection, setUser } from "../redux/slices/userSlice";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import SideBar from "../components/sideBar";
import logo from "../assets/logo.png"
import io from 'socket.io-client'

export default function Home() {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const fetchUserDetails = async () => {
    const url = "http://127.0.0.1:8080/api/user-details";
    try {
      const response = await axios({
        method: "get",
        url: url,
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        withCredentials: true,
      });
      if (response?.data?.data.logout) {
        dispatch(logout());
        navigate("/email");
      }
      dispatch(setUser(response.data.data)); 
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  /** Socket Connection */

  useEffect(()=>{
    const socketConnection = io('http://127.0.0.1:8080',{
      auth:{
        token: localStorage.getItem('token')
      }
    })
    socketConnection.on('onlineUsers', (data)=>{
      dispatch(setOnlineUser(data))
    })
    dispatch(setSocketConnection(socketConnection))
    return ()=>{
      socketConnection.disconnect()
    }
  }, [])


  const basePath = location.pathname === "/";
  return (
    <div className="grid lg:grid-cols-[300px,1fr] h-screen max-h-screen">
      <section className={`bg-white ${!basePath && "hidden"} lg:block`}>
        <SideBar/>
      </section>
      {/**message component**/}
      <section className={`${basePath && "hidden"}`}>
        <Outlet />
      </section>
      <div
        className={`justify-center items-center flex-col gap-2 hidden ${!basePath ? "hidden" : "lg:flex" }`}>
        <div>
          <img src={logo} width={250} alt='logo' />
        </div>
        <p className='text-lg mt-2 text-slate-500'>Select user to send message</p>
      </div>
    </div>
  );
}
