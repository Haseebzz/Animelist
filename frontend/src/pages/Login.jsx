import React, {useState} from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useCookies} from "react-cookie"
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar';
const Login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const[_, setCookies] = useCookies(["access_token"]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const result = await axios.post("http://localhost:4000/auth/login", {
          username,
          password
      })
      setCookies("access_token", result.data.token);
      window.localStorage.setItem("userID", result.data.userID);
      window.localStorage.setItem("username", result.data.username);
      navigate("/");
  } catch (error) {
      alert("login failed")
      console.error(error);
  }
  };

  return (
    <div>
      <Navbar/>  
      <div className="h-screen mt-10">
  <form className="max-w-[400px] mx-auto w-full bg-white p-6 rounded-md h-[500px] flex flex-col  " onSubmit={handleSubmit} >
    <h2 className="text-4xl font-bold text-center py-6">Login</h2>
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
      Login 
    </button>
    <p className="text-center">
      Dont have an account?
      <Link to="/register" className="text-blue-500 cursor-pointer">Register</Link>
    </p>
  </form>
</div>
    </div>
  )
}

export default Login