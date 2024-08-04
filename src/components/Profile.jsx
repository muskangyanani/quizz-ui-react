import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

function Profile() {
    const { user, authTokens, updateUser } = useAuth();
    const [editMode, setEditMode] = useState(false);
    const [username, setUsername] = useState(user.username);
    const [fullName, setFullName] = useState(user.full_name);
    const [image, setImage] = useState(null);

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
            updateUser(updatedUser);

            console.log(response.data);
            setEditMode(false);
        } catch (error) {
            console.log(error.response);
        }
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <div className="bg-white p-6 mx-auto">
            <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-teal-700 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                    {user.image ? (
                        <img src={`http://localhost:8000${user.image}`} alt="profile" className="w-full h-full object-cover rounded-full" />
                    ) : (
                        user.username[0].toUpperCase()
                    )}
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
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="profile" className='font-bold'>Upload/Change Profile image</label>
                                    <input type="file" id="profile" className='w-fit' onChange={handleFileChange} />
                                </div>
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
                                        setFullName(user.full_name);
                                    }}
                                >
                                    Cancel
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
