import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from "react-cookie";

const Navbar = () => {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["access_token"]);
  const isLoggedIn = !!cookies.access_token; // Check if the user is logged in

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/");
    window.location.reload();
  }

  return (
    <div className='h-22 text-white w-full bg-gray-700'>
      <div className='max-w-[1440px] mx-auto flex justify-between items-center flex-col sm:flex-row w-full'>
        <h1 className='text-xl font-bold'>Animelist</h1>
        <span className='p-4 font-bold text-xl'>{window.localStorage.username}</span>
        <ul className='flex flex-col sm:flex-row cursor-pointer'>
          <Link to="/" className='p-4 hover:bg-red-600'>Home</Link>
          {/* Conditionally render MyList, Register, and Login */}
          {!isLoggedIn && (
            <>
              <Link to="/register" className='p-4 hover:bg-red-600'>Register</Link>
              <Link to="/login" className='p-4 hover:bg-red-600'>Login</Link>
            </>
          )}
          {/* Conditionally render Logout and username */}
          {isLoggedIn && (
            <>
              
              <li className='p-4 hover:bg-red-600'>MyList</li>
              <li onClick={logout} className='p-4 hover:bg-red-600'>Logout</li>
              <li className='p-4 hover:bg-red-600'>Profile</li>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Navbar