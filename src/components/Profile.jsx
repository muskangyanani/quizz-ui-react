import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

function Profile() {
    const [userDetail, setUserDetail] = useState({
        username: '',
        full_name: '',
        image: ''
    });
    const { user } = useAuth();
    const [profileImage, setProfileImage] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const tokens = JSON.parse(localStorage.getItem('authTokens'));
        if (tokens) {
            setAccessToken(tokens.access);
            fetchUserDetails(tokens.access);
        }
    }, [accessToken]);

    const fetchUserDetails = (token) => {
        axios.get('http://127.0.0.1:8000/auth/user/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => {
                const data = response.data.response;
                setUserDetail(data);
            })
            .catch(async (error) => {
                if (error.response && error.response.status === 401) {
                    try {
                        const refreshResponse = await axios.post('http://127.0.0.1:8000/auth/token/refresh/', {
                            refresh: JSON.parse(localStorage.getItem('authTokens')).refresh
                        });
                        const newTokens = refreshResponse.data;
                        localStorage.setItem('authTokens', JSON.stringify(newTokens));
                        setAccessToken(newTokens.access);
                        fetchUserDetails(newTokens.access);
                    } catch (refreshError) {
                        console.error('Error refreshing token:', refreshError);
                        // Handle refresh token expiry, logout user, etc.
                    }
                } else {
                    console.error('Error fetching user details:', error.response);
                }
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetail({
            ...userDetail,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        setProfileImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        if (userDetail.username) {
            formData.append('username', userDetail.username);
        }
        if (userDetail.full_name) {
            formData.append('full_name', userDetail.full_name);
        }
        if (profileImage) {
            formData.append('image', profileImage);
        }

        try {
            const response = await axios.patch('http://127.0.0.1:8000/auth/update-profile/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            setUserDetail(response.data.response);
            setIsEditing(false); // Exit edit mode
        } catch (error) {
            if (error.response) {
                console.error('Error updating profile:', error.response);
            } else if (error.request) {
                console.error('Error request:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
        }
    };

    return (
        <div className="bg-white p-6 mx-auto">
            <div className="flex items-center space-x-4">
                <div className="size-24 bg-teal-700 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                    <img src={userDetail.image} alt={user.username[0].toUpperCase()} />
                </div>
                <div className="flex-grow">
                    <div className="text-gray-700 text-lg">
                        {isEditing ? (
                            <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
                                <div>
                                    <label>Username:</label>
                                    <input
                                        type="text"
                                        name="username"
                                        value={userDetail.username}
                                        onChange={handleInputChange}
                                        className="border border-gray-300 rounded px-2 py-1"
                                    />
                                </div>
                                <div>
                                    <label>Full Name:</label>
                                    <input
                                        type="text"
                                        name="full_name"
                                        value={userDetail.full_name}
                                        onChange={handleInputChange}
                                        className="border border-gray-300 rounded px-2 py-1"
                                    />
                                </div>
                                <div>
                                    <label>Profile Image:</label>
                                    <input
                                        type="file"
                                        name="image"
                                        onChange={handleImageChange}
                                        className="border border-gray-300 rounded px-2 py-1"
                                    />
                                </div>
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                                    Save
                                </button>
                                <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition mt-2">
                                    Cancel
                                </button>
                            </form>
                        ) : (
                            <div>
                                <p>Username - {userDetail.username}</p>
                                <p>Full Name - {userDetail.full_name}</p>
                                <p>Email - {user.email}</p>
                                <p>Quiz Created - 10</p>
                            </div>
                        )}
                    </div>
                    {!isEditing && (
                        <div className="mt-4 flex flex-col w-fit">
                            <button onClick={() => setIsEditing(true)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition">
                                Edit profile
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile;
