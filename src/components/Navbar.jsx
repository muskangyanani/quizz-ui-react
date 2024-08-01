import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { jwtDecode } from "jwt-decode";

export default function Navbar() {

  let { user, setUser, setAuthTokens, logoutUser } = useAuth()
  const navigate = useNavigate()

  user = localStorage.getItem("authTokens") ? jwtDecode(localStorage.getItem("authTokens")) : null;

  console.log(user !== null ? true : false)

  logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate('/login');
  };


  return (
    <div className="border h-16 flex justify-between items-center p-6 shadow-md">
      <a href="/" className="text-teal-700 font-extrabold text-3xl">QUIZZ</a>
      <div className="flex gap-6">
        {user !== null ? <button onClick={logoutUser} className="bg-teal-700 px-3 py-2 rounded-lg text-white font-bold">Logout</button> : <button onClick={() => navigate('/login')} className="bg-teal-700 text-white px-3 py-2 rounded-lg font-bold">Login</button>}
        {user === null ? <button onClick={() => navigate('/signup')} className="bg-teal-700 text-white px-3 py-2 rounded-lg font-bold">Signup</button> : null}
      </div>
    </div>
  )
}