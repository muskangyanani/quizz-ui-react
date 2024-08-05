import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const { user, authTokens, updateUser } = useAuth();
    const [editMode, setEditMode] = useState(false);
    const [username, setUsername] = useState(user.username);
    const [fullName, setFullName] = useState(user.full_name);
    const [image, setImage] = useState(null);

    console.log(user)

    const navigate = useNavigate()

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleSaveClick = async () => {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('full_name', fullName);
        if (image) {
            formData.append('image', image);
        }

        try {
            const accessToken = authTokens.access;
            const response = await axios.patch('http://localhost:8000/auth/update-profile/', formData, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            const updatedUser = response.data.response;
            console.log(updatedUser)
            updateUser(updatedUser);
            navigate('/login')
            setEditMode(false);
        } catch (error) {
            console.log(error.response);
        }
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-8 mx-auto max-w-2xl mt-6">
            <div className="flex items-center space-x-8">
                <div className="w-32 h-32 bg-teal-700 rounded-full flex items-center justify-center text-white text-5xl font-bold overflow-hidden">
                    {user.image ? (
                        <img src={`http://localhost:8000${user.image}`} alt="profile" className="w-full h-full object-cover" />
                    ) : (
                        user.username[0].toUpperCase()
                    )}
                </div>
                <div className="flex-grow">
                    <div className="text-gray-800">
                        {editMode ? (
                            <div className='space-y-4'>
                                <div className='flex items-center'>
                                    <span className='font-bold w-32'>Username:</span>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="border font-normal border-gray-300 px-3 py-2 rounded flex-grow"
                                    />
                                </div>
                                <div className='flex items-center'>
                                    <span className='font-bold w-32'>Full Name:</span>
                                    <input
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="border font-normal border-gray-300 px-3 py-2 rounded flex-grow"
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="profile" className='font-bold'>Upload/Change Profile image</label>
                                    <input type="file" id="profile" className='w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100' onChange={handleFileChange} />
                                </div>
                                <p className='text-sm text-yellow-400'>*You have to login again to update your profile</p>
                            </div>
                        ) : (
                            <div className='space-y-3 text-lg'>
                                <p><span className="font-semibold w-32 inline-block">Username:</span> {username}</p>
                                <p><span className="font-semibold w-32 inline-block">Full Name:</span> {fullName}</p>
                                <p><span className="font-semibold w-32 inline-block">Email:</span> {user.email}</p>
                                <p><span className="font-semibold w-32 inline-block">Quiz Created:</span> 10</p>
                            </div>
                        )}
                    </div>
                    <div className="mt-6">
                        {editMode ? (
                            <div className='flex gap-4'>
                                <button
                                    className="bg-teal-600 text-white px-6 py-2 rounded-full hover:bg-teal-700 transition duration-300 ease-in-out transform hover:scale-105"
                                    onClick={handleSaveClick}
                                >
                                    Save
                                </button>
                                <button
                                    className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105"
                                    onClick={() => {
                                        setEditMode(false);
                                        setUsername(user.username);
                                        setFullName(user.full_name);
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <button
                                className="bg-teal-600 text-white px-6 py-2 rounded-full hover:bg-teal-700 transition duration-300 ease-in-out transform hover:scale-105"
                                onClick={handleEditClick}
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
