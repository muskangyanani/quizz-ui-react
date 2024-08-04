import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { jwtDecode } from "jwt-decode";
// import { useNavigate } from 'react-router-dom';


function Profile() {

    let { user } = useAuth()
    const authTokens = localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null;
    user = authTokens ? jwtDecode(authTokens.access) : null;
    console.log(user)

    // const navigate = useNavigate()

    const [editMode, setEditMode] = useState(false);
    const [username, setUsername] = useState(user.username);
    const [fullName, setFullName] = useState(user.full_name);

    const handleEditClick = () => {
        setEditMode(true);
    }

    const handleSaveClick = async () => {
        try {

            const authTokens = JSON.parse(localStorage.getItem('authTokens'));
            const accessToken = authTokens.access;
            console.log(accessToken);

            const response = await axios.patch('http://localhost:8000/auth/update-profile/', {
                username: username,
                full_name: fullName
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            console.log(response.data);
            setEditMode(false);
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <div className="bg-white p-6 mx-auto">
            <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-teal-700 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                    T
                </div>
                <div className="flex-grow">
                    <div className="text-gray-700">
                        {editMode ? (
                            <div className='flex flex-col gap-3'>
                                <p className='font-bold'>
                                    Username - <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="border font-normal border-gray-300 px-2 py-1 rounded"
                                    />
                                </p>
                                <p className='font-bold'>
                                    Full Name - <input
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="border font-normal border-gray-300 px-2 py-1 rounded"
                                    />
                                </p>
                            </div>
                        ) : (
                            <div>
                                <p>Username - {username}</p>
                                <p>Full Name - {fullName}</p>
                                <p>Email - {user.email}</p>
                                <p>Quiz Created - 10</p>
                            </div>
                        )}
                    </div>
                    <div className="mt-4 space-x-2">
                        {editMode ? (
                            <div className='flex gap-4'>
                                <button
                                    className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition"
                                    onClick={handleSaveClick}
                                >
                                    Save
                                </button>
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                                    onClick={() => {
                                        setEditMode(false);
                                        setUsername(user.username);
                                        setFullName(user.full_name)
                                    }}
                                >
                                    Cancle
                                </button>
                            </div>
                        ) : (
                            <button
                                className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
                                onClick={handleEditClick}
                            >
                                Edit profile
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
