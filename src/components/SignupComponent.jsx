import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function SignupComponent() {

    let { registerUser } = useAuth()

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()

    registerUser = async (email, username, password, password2) => {
        try {
            const response = await fetch("http://localhost:8000/auth/register/", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    email, username, password, password2
                })
            });
            const data = await response.json();
            console.log(data);

            if (response.status === 201) {
                navigate('/login');
            } else {
                if (data.email) {
                    setError(data.email)
                } else if (!data.email && data.username) {
                    setError(data.username)
                } else {
                    setError(data.password)
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        if (password !== password2) {
            setError("Password does not match! try again")
        }
        registerUser(email, username, password, password2)
    }
    return (
        <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 sm:py-16 lg:py-20">
            <form className="bg-white p-5 sm:p-8 rounded-lg shadow-xl w-full max-w-md" onSubmit={handleSubmit}>
                <h2 className="text-xl sm:text-2xl font-bold mb-6 text-teal-700 text-center">Signup</h2>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2 text-sm sm:text-base">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm sm:text-base"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 font-bold mb-2 text-sm sm:text-base">Username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm sm:text-base"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password1" className="block text-gray-700 font-bold mb-2 text-sm sm:text-base">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm sm:text-base"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password2" className="block text-gray-700 font-bold mb-2 text-sm sm:text-base">Confirm Password</label>
                    <input
                        type="password"
                        name="password2"
                        id="password2"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm sm:text-base"
                        onChange={(e) => setPassword2(e.target.value)}
                    />
                </div>
                {error && <p className="text-red-500 font-bold italic mb-4 text-sm sm:text-base">{error}</p>}
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="w-full bg-teal-700 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 text-sm sm:text-base"
                    >
                        Signup
                    </button>
                </div>
                <p className="text-center text-gray-600 mt-4 text-sm sm:text-base">
                    Already have an account? <Link to="/login" className="text-teal-700 hover:underline">Login</Link>
                </p>
            </form>
        </div>
    )
}

export default SignupComponent
