import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { MdQuiz, MdEdit, MdSave, MdCancel } from 'react-icons/md';
import useAxios from '../utils/useAxios';

function Profile() {
    const { user, authTokens, updateUser } = useAuth();
    const [editMode, setEditMode] = useState(false);
    const [username, setUsername] = useState(user.username);
    const [fullName, setFullName] = useState(user.full_name);
    const [image, setImage] = useState(null);
    const [userQuizzes, setUserQuizzes] = useState([]);

    const navigate = useNavigate()
    const axios = useAxios();
    const baseURL = "http://localhost:8000/auth";

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
            const response = await axios.patch(`${baseURL}/update-user`, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            });
            // console.log(response.data);
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

    useEffect(() => {
        const fetchUserQuizzes = async () => {
            try {
                const accessToken = authTokens.access;
                const response = await axios.get('http://localhost:8000/api/quizzes/user/', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                setUserQuizzes(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error.response);
            }
        };

        fetchUserQuizzes();
    }, [authTokens.access]);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white shadow-xl rounded-lg overflow-hidden max-w-4xl mx-auto mb-12">
                <div className="md:flex">
                    <div className="md:flex-shrink-0">
                        <div className="h-48 w-full md:w-48 bg-teal-700 flex items-center justify-center">
                            {user.image ? (
                                <img src={`http://localhost:8000${user.image}`} alt="profile" className="h-full w-full object-cover" />
                            ) : (
                                <span className="text-white text-6xl font-bold">{user.username[0].toUpperCase()}</span>
                            )}
                        </div>
                    </div>
                    <div className="p-8 w-full">
                        <div className="uppercase tracking-wide text-sm text-teal-700 font-semibold mb-1">User Profile</div>
                        <div className="space-y-4">
                            {editMode ? (
                                <>
                                    <InputField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                                    <InputField label="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                                    <div>
                                        <label htmlFor="profile" className="block text-sm font-medium text-gray-700 mb-1">Upload/Change Profile image</label>
                                        <input type="file" id="profile" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100" onChange={handleFileChange} />
                                    </div>
                                    <p className="text-sm text-yellow-600">*You have to login again to update your profile</p>
                                </>
                            ) : (
                                <>
                                    <ProfileInfo label="Username" value={username} />
                                    <ProfileInfo label="Full Name" value={fullName} />
                                    <ProfileInfo label="Email" value={user.email} />
                                </>
                            )}
                        </div>
                        <div className="mt-6 flex space-x-3">
                            {editMode ? (
                                <>
                                    <Button onClick={handleSaveClick} icon={<MdSave />} text="Save" color="teal" />
                                    <Button onClick={() => { setEditMode(false); setUsername(user.username); setFullName(user.full_name); }} icon={<MdCancel />} text="Cancel" color="red" />
                                </>
                            ) : (
                                <Button onClick={handleEditClick} icon={<MdEdit />} text="Edit Profile" color="teal" />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Quizzes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {userQuizzes.map((quiz) => (
                    <QuizCard key={quiz.id} quiz={quiz} />
                ))}
            </div>
        </div>
    );
}

const InputField = ({ label, value, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input type="text" value={value} onChange={onChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500" />
    </div>
);

const ProfileInfo = ({ label, value }) => (
    <p className="text-sm text-gray-600">
        <span className="font-medium text-gray-900">{label}:</span> {value}
    </p>
);

const Button = ({ onClick, icon, text, color }) => (
    <button
        onClick={onClick}
        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-${color}-600 hover:bg-${color}-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${color}-500`}
    >
        {icon}
        <span className="ml-2">{text}</span>
    </button>
);

const QuizCard = ({ quiz }) => (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="bg-teal-700 text-white p-4">
            <div className="flex items-center justify-center mb-2">
                <MdQuiz className="text-4xl" />
            </div>
            <h2 className="font-bold text-xl text-center truncate">{quiz.name}</h2>
        </div>
        <div className="p-4">
            <div className="flex justify-between text-sm text-gray-600 mb-4">
                <span>Time: {quiz.time_limit} min</span>
                <span>Questions: {quiz.no_of_questions}</span>
            </div>
            <button
                className="w-full bg-teal-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors duration-300"
                onClick={() => window.location.href = `/quiz/${quiz.id}`}
            >
                Start Quiz
            </button>
        </div>
    </div>
);

export default Profile;