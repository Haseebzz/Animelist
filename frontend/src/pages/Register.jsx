import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

   const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        await axios.post("http://localhost:4000/auth/register", {
            username,
            password
        })
        alert("Registeration completed!")
        navigate("/ login")
    } catch (error) {
        alert(error.response.data.message)
        console.log(error)
    }
   }
  return (
    <div>
      <Navbar/>  
      <div className="h-screen mt-10">
  <form className="max-w-[400px] mx-auto w-full bg-white p-6 rounded-md h-[500px] flex flex-col " onSubmit={handleSubmit}>
    <h2 className="text-4xl font-bold text-center py-6">Sign Up</h2>
    <div className="flex flex-col mb-4">
      <label className="mb-2" >Username</label>
      <input className="border p-2 bg-gray-100"  value={username}
        onChange={(e) => setUsername(e.target.value)}
        type="text" />
    </div>
    <div className="flex flex-col mb-4">
      <label className="mb-2">Password</label>
      <input className="border p-2 bg-gray-100" value={password}
              onChange={(e) => setPassword(e.target.value)} type="password" />
    </div>
    <button className=" mx-auto border w-[100px] my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white" type="submit">
      Sign Up
    </button>
    <p className="text-center">
      Already have an account?
      <Link to="/login" className="text-blue-500 cursor-pointer">Login</Link>
    </p>
  </form>
</div>
    </div>
  )
}

export default Register