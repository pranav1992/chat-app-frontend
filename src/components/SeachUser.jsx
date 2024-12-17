import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import LoadingIndicator from "./LoadingIndicator";
import UserSearchedCard from "./UserSearchedCard";
import axios from "axios";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";

function SeachUser({onClose}) {
  const [searchedUser, setSearchedUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearch = async () => {
    const URL = "http://127.0.0.1:8080/api/search-user"
    try {
        setLoading(true)
        const response = await axios.post(URL,{search: search})
        setSearchedUser(response.data.data)
        setLoading(false)
    } catch (error) {
        setLoading(false)
        toast.error(error?.response?.data?.message)
    }
  } 
  useEffect(()=>{handleSearch()},[search])
  console.log("searched user =>", searchedUser)

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-slate-700 bg-opacity-40 p-2">
      <div className="w-full max-w-lg mx-auto mt-10">
        <div className="bg-white rounded h-14 overflow-hidden flex">
          <input
            type="text"
            placeholder="search user by name email..."
            className="w-full outline-none py-1 h-full px-4"
            onChange={(e)=>setSearch(e.target.value)}
            value={search}
          />
          <div className="h-14 w-14 flex justify-center items-center">
            <IoSearchOutline size={25} />
          </div>
        </div>
        {/** Searched user list */}
        <div className="bg-white mt-2 w-full p-4 rounded">
          {/** No user found */}
          {searchedUser.length === 0 && !loading && (
            <p className="text-center text-slate-500">No user found</p>
          )}
          {loading && (
            <div>
              <LoadingIndicator />
            </div>
          )}
          {searchedUser.length !== 0 &&
            !loading &&
            searchedUser.map(
              (user, index) => {
                return <UserSearchedCard key={user._id} user={user} onClose={onClose} />
              }
            )}
        </div>
      </div>

      <div className='absolute top-0 right-0 text-2xl p-2 lg:text-4xl hover:text-white' onClick={onClose}>
            <button>
                <IoClose/>
            </button>
        </div>
    </div>
  );
}

export default SeachUser;
