import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { jwtDecode } from "jwt-decode";

export default function Navbar() {

  let { user, setUser, setAuthTokens, logoutUser } = useAuth()
  const navigate = useNavigate()

  user = localStorage.getItem("authTokens") ? jwtDecode(localStorage.getItem("authTokens")) : null;

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
    <div className="border h-20 flex justify-between items-center p-6 shadow-md">
      <a href="/" className="text-teal-700 font-extrabold text-3xl">QUIZZ</a>
      <div className="flex gap-6">
        {user !== null ?
          <div className="flex gap-6 items-center">
            <button onClick={logoutUser} className="bg-teal-700 px-3 py-2 rounded-lg text-white font-bold">Logout</button>
            <div className="size-12 bg-teal-700 cursor-pointer rounded-full flex items-center justify-center text-white text-3xl font-bold" onClick={() => { navigate('/profile') }}>
              {user.image ?
                <img src={`http://localhost:8000${user.image}`} alt="profile" className="w-full h-full object-cover rounded-full" />
                :
                user.username[0].toUpperCase()
              }
            </div>
          </div>

          :
          <button onClick={() => navigate('/login')} className="bg-teal-700 text-white px-3 py-2 rounded-lg font-bold">Login</button>}
        {user === null ? <button onClick={() => navigate('/signup')} className="bg-teal-700 text-white px-3 py-2 rounded-lg font-bold">Signup</button> : null}
      </div>
    </div>
  )
}