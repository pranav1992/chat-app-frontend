import React, { useEffect, useState } from "react";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { FiArrowUpLeft } from "react-icons/fi";
import { IoLogOutSharp } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "./Avatar";
import EditUserDetails from "./EditUserDetails";
import { logout } from "../redux/slices/userSlice";
import SeachUser from "./SeachUser";

function SideBar() {
  const user = useSelector((state) => state?.user);
  const [editUser, setEditUserOpen] = useState(false)
  const [openSearchUser, setOpenSearchUser] = useState(false)
  const [allUsers, setAllUsers] = useState([]);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {}, [user])

  const handleLogout = () => {
    dispatch(logout());
    navigate("/email");
    localStorage.clear();
  };
  return (
    <div className="w-full h-full grid grid-cols-[48px,1fr] bg-white">
      <div className="bg-slate-100 w-12 h-full rounded-tr-lg rounded-br-lg py-5 flex flex-col justify-between ">
        <div>


         {/** Top chat Active Icon */}
          <NavLink
            className={(isActive) =>
              `w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 ${
                isActive && "bg-slate-200"
              }`
            } title="chat">
            <IoChatbubbleEllipsesSharp size={30} />
          </NavLink>


         {/** Add user */}
          <div title="Add User" onClick={()=>setOpenSearchUser(true)} className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200">
            <FaUserPlus size={30} />
          </div>
        </div>

        <div className="flex flex-col items-center">
         {/** Avatar*/}
          <button
            className="mx-auto"
            title={user?.name}
            onClick={() => setEditUserOpen(true)}
          >
            <Avatar
              width={40}
              height={40}
              name={user?.name}
              imageUrl={user?.profile_pic}
              userId={user?._id}
            />
          </button>


         {/** Log out*/}
          <button
            className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200"
            onClick={handleLogout}
          >
            <span className="-ml-2"></span>
            <IoLogOutSharp size={20} />
          </button>
        </div>
      </div>

      {/** All the chatrooms rooms */}
      <div className="w-full">
        {/** Headings */}
        <div className="h-16 flex items-center">
          <h2 className="text-xl font-bold p-2 text-slate-800">Messages</h2>
        </div>
        {/** Divider */}
        <div className="bg-slate-200 p-[0.5px]"></div>
        {/** All users */}
        <div className="bg-red-50 h-[calc(100vh-64px)] overflow-x-hidden overflow-y-auto">
          {allUsers.length === 0 && (
            <div className="mt-16">
              <div className="flex justify-center items-center my-4">
                <FiArrowUpLeft size={50} />
              </div>
              <div className="text-lg text-center text-slate-400">
                Explore users to start conversation with.
              </div>
            </div>
          )}
        </div>
      </div>

      {/** Edit user details */}
      {editUser && (
        <EditUserDetails onClose={() => setEditUserOpen(false)} user={user} />
      )}

       {/** search user */}
       {
        openSearchUser && (
          <SeachUser onClose={()=>setOpenSearchUser(false)}/>
        )
       }
    </div>
  );
}

export default SideBar;
