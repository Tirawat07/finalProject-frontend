import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ContractIcon, GardenIcon, GardenLogo, HomeIcon, LoginIcon } from '../assets/svgComponents'
import fetchingStore from '../Store/fetchingStore'
import { toast } from 'react-toastify'



const NavigateBar = () => {
  const navigate = useNavigate()
  const token = fetchingStore((state) => state.token)
  const ClearLoginData = fetchingStore((state) => state.ClearLoginData)

  const hdlLogout = () => {
    ClearLoginData()

  }

  useEffect(() => {
    if (!token) {
      toast.success('Logout!')
    }
    navigate('/')
  }, [token])


  const handleNavigation = (path) => {
    navigate(path)
  }

  

  return (
    <div className='flex flex-col fixed z-40 '>


      <div
        className="overflow-hidden bg-gradient-to-r from-lime-400 to-lime-500 w-screen h-fit"
      >
        <div className="animate-scroll whitespace-nowrap"        >
          
          "Today is a special day for all our customers! We are offering an exclusive 10% discount coupon as a token of our appreciation"
        </div>


      </div>

      <div >

        <nav className="flex flex-row  shadow-2xl w-[100%] bg-gradient-to-r from-teal-400 to-yellow-200 pt-2 pb-2">
          <ul className="flex justify-between flex-auto ml-[50px] mr-[50px] text-gray-600 w-fit h-fit">
            <li className="transition duration-200 ease-in-out hover:bg-green-200 p-2 rounded-lg">
              <a href='#main' className="flex flex-col items-center">
                <HomeIcon className="w-10 h-10" />
                <span>Home</span>
              </a>
            </li>

            <li className="transition duration-200 ease-in-out hover:bg-green-200 p-2 rounded-lg">
              <a href='#our-garden' className="flex flex-col items-center">
                <GardenIcon className="w-10 h-10" />
                <span>Our-Orchard</span>
              </a>
            </li>

            <li className="transition duration-200 ease-in-out hover:bg-green-200 p-2 rounded-lg">
              <a href='#contract' className="flex flex-col items-center">
                <ContractIcon className="w-10 h-10" />
                <span>Contract</span>
              </a>
            </li>
            {token ? (<li className="transition duration-200 ease-in-out  hover:bg-red-400 p-2 rounded-lg">
              <button onClick={() => hdlLogout()} className="flex flex-col items-center">
                <LoginIcon className="w-10 h-10" />
                <span>logout</span>
              </button>
            </li>) :
              <li className="transition duration-200 ease-in-out hover:bg-green-200 p-2 rounded-lg">
                <button onClick={() => handleNavigation('/login')} className="flex flex-col items-center">
                  <LoginIcon className="w-10 h-10" />
                  <span>Login/Register</span>
                </button>
              </li>
            }


          </ul>
        </nav>
      </div>
    </div>
  )
}

export default NavigateBar