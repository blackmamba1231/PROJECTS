import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Profile.css'; // CSS for styling the profile

const Profile = () => {
    const [profileData, setProfileData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        avatar: '' 
    });
    const [editMode, setEditMode] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // useNavigate hook for navigation

    const fetchProfile = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/user/profile', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setProfileData(response.data); // Update profile data with the fetched values
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Profile Data being sent:", profileData);
        try {
            await axios.put('http://localhost:3000/api/v1/user/', profileData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setMessage('Profile updated successfully');
            setEditMode(false);
        } catch (error) {
            console.error('Error updating profile:', error);
            setMessage('Error updating profile.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from local storage
        navigate('/signin'); // Redirect to login page
    };

    return (
        <div className="p-5 max-w-lg mx-auto">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">User Profile</h2>
                <div>
                    <button 
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 mr-2"
                        onClick={() => setEditMode(!editMode)}
                    >
                        {editMode ? 'Cancel' : 'Edit Profile'}
                    </button>
                    <button 
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
                        onClick={handleLogout}
                    >
                        Log Out
                    </button>
                </div>
            </div>
            {message && <p className="text-green-500 mt-2">{message}</p>}
            <div className="mt-5">
                <div className="mb-4">
                    <img 
                        src={profileData.avatar || 'https://via.placeholder.com/150'}
                        alt="User Avatar"
                        className="w-36 h-36 rounded-full"
                    />
                </div>
                <div className="mt-5">
                    {!editMode ? (
                        <div>
                            <p><strong>First Name:</strong> {profileData.firstName}</p>
                            <p><strong>Last Name:</strong> {profileData.lastName}</p>
                            <p><strong>Email:</strong> {profileData.username}</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input 
                                type="text"
                                name="firstName"
                                value={profileData.firstName}
                                onChange={handleChange}
                                placeholder="First Name"
                                className="w-full p-2 border rounded-md"
                            />
                            <input 
                                type="text"
                                name="lastName"
                                value={profileData.lastName}
                                onChange={handleChange}
                                placeholder="Last Name"
                                className="w-full p-2 border rounded-md"
                            />
                            <input 
                                type="email"
                                name="username"
                                value={profileData.username}
                                onChange={handleChange}
                                placeholder="Email"
                                className="w-full p-2 border rounded-md"
                            />
                            <input 
                                type="text"
                                name="avatar"
                                value={profileData.avatar}
                                onChange={handleChange}
                                placeholder="Avatar URL (optional)"
                                className="w-full p-2 border rounded-md"
                            />
                            <button 
                                type="submit"
                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
                            >
                                Save Changes
                            </button>
                        </form>
                    )}
                </div>
            </div>
            <div className="flex justify-around mt-8">
                <button 
                    onClick={() => navigate('/book')} 
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                >
                    Book Ticket
                </button>
                <button 
                    onClick={() => navigate('/my-tickets')} 
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                >
                    View Tickets
                </button>
                <button 
                    onClick={() => navigate('/chat')} 
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                >
                    ChatBot
                </button>
            </div>
        </div>
    );
};

export default Profile;
