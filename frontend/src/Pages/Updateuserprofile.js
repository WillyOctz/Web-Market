import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { BiShowAlt } from "react-icons/bi";
import { BiHide } from "react-icons/bi";

const Updateuserprofile = () => {
    const navigate = useNavigate()
    const [formData, setformData] = useState({
        firstname : "",
        lastname : "",
        email : "",
        password : "",
        confirmpassword : "",
        image : "" || null,
    })

    const [previewImage, setPreviewImage] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    
    useEffect(() => {
        const fetchUserData = async() => {
            try {
                const storedUser = JSON.parse(localStorage.getItem("user"))
                if (!storedUser) {
                    toast.error("You must log in to access this page.")
                    navigate("/Login")
                    return
                }

                const response = await axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/Userprofile/${storedUser._id}`)
                if (response.data.data) {
                    const { firstname, lastname, email, image } = response.data.data
                    setformData({ firstname, lastname, email, password : "", confirmpassword : "", image})

                    if (image) {
                        setPreviewImage(`${process.env.REACT_APP_SERVER_DOMAIN}${image}`);
                    }
                }
            }

            catch (err) {
                console.err("Error occured when fetching data", err)
                toast.error("An error is occured.please try again!")
                navigate("/Login")
            }
        }

        fetchUserData()        
    }, [navigate])

    const handleChange = (e) => {
        const { name, value } = e.target
        setformData({ ...formData, [name]: value })
    }

    const handleImageChange = (e) =>{
        const file = e.target.files[0]
        if (file) {
            setformData({ ...formData, image : file })
            setPreviewImage(URL.createObjectURL(file))
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        if (formData.password !== formData.confirmpassword) {
            toast.error("Passwords do not match!")
            return
        }

        try {
            const storedUser = JSON.parse(localStorage.getItem("user"))
            const formDataToSend = new FormData()

            formDataToSend.append('firstname', formData.firstname)
            formDataToSend.append('lastname', formData.lastname)
            formDataToSend.append('email', formData.email)
            if (formData.password) {
                formDataToSend.append('password', formData.password)
                formDataToSend.append('confirmpassword', formData.confirmpassword);
            }
            if (formData.image && typeof formData.image !== 'string') {
                formDataToSend.append('image', formData.image)
            }

            for (let [key, value] of formDataToSend.entries()) {
                console.log(key, value);
            }

            const response = await axios.put(`${process.env.REACT_APP_SERVER_DOMAIN}/Updateuserprofile/${storedUser._id}`, formDataToSend,
                {
                    headers : {
                        'Content-Type' : 'multipart/form-data',
                    }
                }
            )

            if (response.status === 200 || response.data.message === "User Profile updated successfully!") {
                toast.success("Profile updated successfully!")
                navigate("/Userprofile")
            } else {
                toast.error(response.data.message || "An error occurred. Please try again.")
            }
        }

        catch (error) {
            console.error("Error Updating Profile!", error)
            toast.error("An Error occured!please try again!")
        }
    }

    return (
        <div className='-mt-6'>
        <div className='bg-gradient-to-r from-teal-200 to-teal-500 w-full max-w-lg m-auto items-center flex flex-col p-4 rounded-xl'>
            <h2 className='text-3xl font-bold'>Update Profile</h2>
            <form onSubmit={handleSubmit} className='w-full mt-3'>
                <div className='mt-3'>
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        className='w-full p-2 rounded'
                        required
                    />
                </div>
                <div className='mt-3'>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        className='w-full p-2 rounded'
                        required
                    />
                </div>
                <div className='mt-3'>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className='w-full p-2 rounded'
                        required
                    />
                </div>
                <div className='mt-3'>
                    <label>New Password:</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className='w-full p-2 rounded'
                        />
                        <span
                            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <BiHide /> : <BiShowAlt />}
                        </span>
                    </div>
                </div>
                <div className='mt-3'>
                    <label>Confirm Password:</label>
                    <div className="relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmpassword"
                            value={formData.confirmpassword}
                            onChange={handleChange}
                            className='w-full p-2 rounded'
                        />
                        <span
                            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <BiHide /> : <BiShowAlt />}
                        </span>
                    </div>
                </div>
                <div className='mt-3'>
                        <label>Profile Image:</label>
                        {previewImage && (
                            <img
                                src={previewImage}
                                alt="Preview"
                                className='w-32 h-32 mt-2 rounded-full object-cover'
                            />
                        )}
                        <input
                            type="file"
                            name="image"
                            onChange={handleImageChange}
                            className='w-full p-2 rounded mt-2'
                            accept="image/*"
                        />
                    </div>
                <button
                    type="submit"
                    className='w-full max-w-[150px] m-auto bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#106ee8] via-[#0fc1a1] to-[#90e0ab] cursor-pointer text-xl font-semibold text-center py-1 rounded-full mt-5 shadow-md hover:shadow-lg transition duration-300 ease-in-out'>
                    Save Changes
                </button>
            </form>
        </div>
    </div>
    );    
}

export default Updateuserprofile