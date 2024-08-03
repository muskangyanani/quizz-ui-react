import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { jwtDecode } from "jwt-decode";

export default function Navbar() {

  let { user, setUser, setAuthTokens, logoutUser } = useAuth()
  const navigate = useNavigate()

  user = localStorage.getItem("authTokens") ? jwtDecode(localStorage.getItem("authTokens")) : null;

  console.log(user)

  logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate('/login');
  };

  const handleProfileClick = () => {
    navigate('/profile')
  }

  return (
    <div className="border h-16 flex justify-between items-center p-6 shadow-md">
      <a href="/" className="text-teal-700 font-extrabold text-3xl">QUIZZ</a>
      <div className="flex gap-6">
        {user !== null ?
          <div className="flex gap-6 items-center">
            <button onClick={logoutUser} className="bg-teal-700 px-3 py-2 rounded-lg text-white font-bold">Logout</button>
            <p className="font-bold text-lg">Welcome {user.username.charAt(0).toUpperCase() + user.username.slice(1)} !</p>
            <button onClick={handleProfileClick} className="bg-slate-300 text-neutral-700 size-10 font-bold rounded-full">{user.username[0].toUpperCase()}</button>
          </div>

          :
          <button onClick={() => navigate('/login')} className="bg-teal-700 text-white px-3 py-2 rounded-lg font-bold">Login</button>}
        {user === null ? <button onClick={() => navigate('/signup')} className="bg-teal-700 text-white px-3 py-2 rounded-lg font-bold">Signup</button> : null}
      </div>
    </div>
  )
}