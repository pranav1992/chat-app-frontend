import { Outlet } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

export default function App() {
  return (
      <>
      <Toaster/>
      <Outlet ></Outlet></>
 
  )
}