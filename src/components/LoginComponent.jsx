import React, { useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function LoginComponent() {
  let { loginUser, setAuthTokens, setUser } = useAuth()
  const [error, setError] = useState('')
  const navigate = useNavigate()

  loginUser = async (email, password) => {
    const response = await fetch("http://localhost:8000/auth/token/", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        email, password
      })
    });
    const data = await response.json();

    if (response.status === 200) {
      console.log("Logged In");
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate('/');
    } else {
      console.log(response.status);
      setError("No active account found with the given credentials")
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
    if (email.length > 0) {
      loginUser(email, password)
    }
  }

  return (
    <div className="login-container flex items-center justify-center my-28 px-4 sm:px-6 lg:px-8">
      <form className="login-form bg-white p-6 sm:p-8 rounded-lg shadow-xl w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-teal-700 text-center">Login</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {error && <p className="text-red-500 text-sm font-bold italic mb-4">{error}</p>}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="w-full bg-teal-700 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
          >
            Login
          </button>
        </div>
        <p className="text-center text-gray-600 mt-4 text-sm sm:text-base">
          Don't have an account? <Link to="/signup" className="text-teal-700 hover:underline">Signup</Link>
        </p>
      </form>
    </div>
  )
}

export default LoginComponent
