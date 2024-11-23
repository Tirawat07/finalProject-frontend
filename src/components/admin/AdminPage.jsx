import React, { useEffect } from 'react'
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import WateringManage from './Water/WateringManage';
import { DownIcon, EventIcon, SearchIcon, TaskIcon, UpIcon, WaterIcon } from '../../assets/svgComponents';
import fetchingStore from '../../Store/fetchingStore';
import { toast } from 'react-toastify';



const AdminPage = () => {

  const ClearLoginData = fetchingStore((state)=>state.ClearLoginData)
const token = fetchingStore((state)=>state.token)
  const navigate = useNavigate()


  //ui
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [navIcon, setNavIcon] = useState(true)
  //

  const [date, setDate] = useState('')
  const [fieldName, setFieldName] = useState('')


  const hdlSubmit = (e) => {
    e.preventDefault()
    console.log(date)
  }

  const closeSidebar = (path) => {
    navigate(path)
    setIsSidebarOpen(true)
  }
  

  const hdlLogout = () => {

    ClearLoginData()
    
  }
  
  useEffect(()=>{
    if(!token){
      toast.success('Logout !!')
      navigate('/login')
    }
  },[token])






  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full transition-transform duration-300 ease-in-out overflow-hidden ${isSidebarOpen ? '-translate-x-64' : 'translate-x-0 '
        }`}>
        <div className="bg-gray-800 text-white w-64 h-full">
          <nav className='flex flex-col justify-between gap-[5vh] items-center w-64 p-10 mt-[100px]'>
            <div className='flex flex-col justify-between items-center'>

              <button
                onClick={() => closeSidebar("/admin")}
                className="w-full py-3 px-6 rounded-lg transition duration-200 hover:bg-gray-700 hover:text-white text-center  shadow-sm hover:shadow-md"
              >
                <WaterIcon className='w-20 h-20'>


                  irrigation management
                </WaterIcon>
              </button>
              <h1>Watering</h1>

            </div>

            <div className='flex flex-col justify-between  items-center'>

              <button
                onClick={() => closeSidebar("task")}
                className=" py-3 px-6 rounded-lg transition duration-200 hover:bg-gray-700 hover:text-white text-center  shadow-sm hover:shadow-md"
              >
                <TaskIcon className='w-20 h-20'>

                </TaskIcon>

              </button>
              <h1>Task</h1>

            </div>

            <div className='flex flex-col items-center justify-between  '>

              <button
                onClick={() => closeSidebar("event")}
                className="w-full py-3 px-6 rounded-lg transition duration-200 hover:bg-gray-700 hover:text-white text-center  shadow-sm hover:shadow-md"
              >
                <EventIcon className='w-20 h-20c'></EventIcon>
              </button>
              <h1>Event</h1>
            </div>

            <button
                onClick={() => hdlLogout()}
                className="w-full py-3 px-6 rounded-lg transition duration-200 hover:bg-red-600 bg-red-300 hover:text-white text-center  shadow-sm hover:shadow-md"
              >
              logout
              </button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-0' : 'ml-64'
        }`}>
        {/* Header */}
        <header className="h-[15vh] bg-white shadow-md fixed top-0 right-0 left-0 z-10">
          <div className="flex items-center justify-between h-full px-6">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-lg p-2"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="text-2xl font-bold text-gray-800">Admin Dashboard</div>
            <div className="w-6"></div>
          </div>
        </header>

        {/* Content */}
        <div className="-mt-[15vh] ">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default AdminPage



