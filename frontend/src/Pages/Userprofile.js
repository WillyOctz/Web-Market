import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import  Imageuserdefault  from '../assets/images/profile.png';
import toast from 'react-hot-toast';

const Userprofile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    //Get user data from Redux state
    const user = useSelector((state) => state.user)

    const toUpdateuserprofile = () => {
        navigate("/Updateuserprofile")
    }
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Check for user is logged in in local storage
                const storedUser = JSON.parse(localStorage.getItem("user"));
                if (!storedUser && !user?._id) {
                    toast.error("You must log in first to access this page.")
                    navigate("/Login");
                    return;
                }

                // Fetch updated user data from the backend
                const response = await axios.get(
                    `${process.env.REACT_APP_SERVER_DOMAIN}/Userprofile/${storedUser?._id || user._id}`
                );

                if (response.data.data) {
                    setUserData(response.data.data);
                } else {
                    throw new Error("User data not found");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                toast.error("An error occurred. Please try again.")
                navigate("/Login");
            } finally {
                setLoading(false);
            }
        };
        
        fetchUserData();
    }, [navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (    
        <div className='-mt-7'>
            <div className='bg-gradient-to-r from-teal-200 to-teal-500 w-full max-w-lg m-auto items-center flex flex-col p-4 rounded-xl'>
                <img src={userData?.image ? `${process.env.REACT_APP_SERVER_DOMAIN}${userData.image}` : Imageuserdefault} alt='' className='w-32 mt-4 rounded-lg'/>         
                <h2 className='text-2xl font-bold mt-2'>User Profile</h2>
                {
                    userData ? (
                    <div className='mt-3 items-center'>
                        <p><strong>Name :</strong> {userData.firstname} {userData.lastname}</p>
                        <p><strong>Email :</strong> {userData.email}</p> 
                    </div>  
                    ) : (
                        <p>Loading...</p>
                    )}
                <button onClick={toUpdateuserprofile} className='w-full max-w-[150px] m-auto bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#106ee8] via-[#0fc1a1] to-[#90e0ab] cursor-pointer text-xl font-semibold text-center py-1 rounded-full mt-5 shadow-md hover:shadow-lg transition duration-300 ease-in-out'>Update</button>
            </div>
        </div>
    );    
}

export default Userprofile