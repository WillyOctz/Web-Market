import React, { useState } from 'react'
import Signimage from '../assets/images/user_icon_gif.gif';
import { BiShowAlt } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import './Login.js';
import { ImagetoBase64 } from '../utility/ImagetoBase64.js';
import { toast } from 'react-hot-toast';

function Signup () {
    
    const navigate = useNavigate()
    const [showPassword,setShowPassword] = useState(false);
    const [showConfirmPassword,setShowConfirmPassword] = useState(false);
    const [data,setData] = useState(
        {
            firstname : "",
            lastname : "",
            email : "",
            password : "",
            confirmpassword : "",
            image: ""
        });
    //console.log(data)
    const handleShowPassword = () => {
        setShowPassword(prev => !prev)
    }
    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(prev => !prev)
    }
    const handleOnChange = (e) => {
        
        const {name,value} = e.target
        setData((prev) => {
            
            return {
                ...prev,
                [name] : value
            }    
        })
    }
    
    const UploadProfileImage = async(e) => {
        const data = await ImagetoBase64(e.target.files[0])
        //console.log(data)

        setData((prev) => {
            return {
                ...prev,
                image : data
            }
        })
    }

//console.log(process.env.REACT_APP_SERVER_DOMAIN)    
    const handleOnSubmit = async(e) => {
        e.preventDefault()
        const {firstname,email,password,confirmpassword,lastname} = data
        if (firstname && email && password && confirmpassword && lastname) {
            
            if(password === confirmpassword) {
                    
                    const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/Signup`,{
                        method : "POST",
                        headers : {
                            "content-type" : "application/json"
                        },
                        body : JSON.stringify(data)
                    });

                    const dataRes = await fetchData.json()
                    //console.log(dataRes)
                //alert(dataRes.message)
                toast(dataRes.message)
                if (dataRes.alert) {
                    navigate("/Login")
                }                
            }

            else {
                alert("Password And Password Confirmation Is Not Matched!")
            }
        }
        else {
            alert("Please Fill The Required Form!")
        }
    }

    return (
        <div className='-mt-12'>
            <div className='w-full max-w-sm m-auto items-center flex flex-col p-4 mt-8 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#106ee8] via-[#0fc1a1] to-[#90e0ab] rounded-xl'>
                <h1 className='text-center text-3xl font-bold font-serif'>Sign Up Page</h1>
                <div className='w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative'>
                    <img src={data.image ? data.image : Signimage} className='w-full h-full'/>
                    <label htmlFor='profileimage'>
                        <div className='absolute bottom-0 h-1/3  bg-slate-500 bg-opacity-50 w-full text-center cursor-pointer'>
                            <p className='text-sm p-1 text-black'>Upload Image</p>
                        </div>
                        <input type={"file"} id="profileImage" accept="image/*" className="hidden" onChange={UploadProfileImage}/>
                    </label>
                </div>

                <form className='mt-1 w-full py-7 flex flex-col' onSubmit={handleOnSubmit}>
                    <label htmlFor='firstname' className='mb-1'>First Name</label>
                    <input type={"text"} id="firstname" name="firstname" className='w-full bg-slate-100 px-2 py-1 mt-2 rounded mb-2 focus-within:outline-blue-400' value={data.firstname} onChange={handleOnChange}></input>

                    <label htmlFor='lastname' className=''>Last Name</label>
                    <input type={"text"} id="lastname" name="lastname" className='w-full bg-slate-100 px-2 py-1 mt-2 rounded mb-2 focus-within:outline-blue-400' value={data.lastname} onChange={handleOnChange}></input>
                
                    <label htmlFor='email'>Email</label>
                    <input type={"email"}id="email" name="email" className='w-full bg-slate-100 px-2 py-1 mt-2 rounded mb-2 focus-within:outline-blue-400' value={data.email} onChange={handleOnChange}></input>
                    
                    <label htmlFor='password'>Password</label>
                    <div className='flex px-2 py-1 bg-slate-100 rounded mt-2 mb-2 focus-within:outline-blue-400 focus-within:outline'>
                        <input type={showPassword ? "text":"password"} id="password" name="password" className='w-full bg-slate-100 border-none outline-none' value={data.password} onChange={handleOnChange}></input>
                        <span className='flex text-xl' onClick={handleShowPassword}>
                            {showPassword ? <BiShowAlt/> : <BiHide/>}</span>
                    </div>

                    <label htmlFor='confirmpassword'>Confirm Password</label>
                    <div className='flex px-2 py-1 bg-slate-100 rounded mt-2 mb-2 focus-within:outline-blue-400 focus-within:outline'>
                        <input type={showConfirmPassword ? "text":"password"} id="confirmpassword" name="confirmpassword" className='w-full bg-slate-100 border-none outline-none' value={data.confirmpassword} onChange={handleOnChange}></input>
                        <span className='flex text-xl' onClick={handleShowConfirmPassword}>
                            {showConfirmPassword ? <BiShowAlt/> : <BiHide/>}</span>
                    </div>

                    <button className='w-full max-w-[150px] m-auto bg-gradient-to-r from-[#f6f6d9] via-[#47e4e0] to-[#5f81e4] cursor-pointer text-xl font-semibold text-center py-1 rounded-full mt-4 shadow-md hover:shadow-lg transition duration-300 ease-in-out'>Register</button>
                </form>
                
                <Link className='mt-3 underline text-blue-500 hover:text-blue-700' to={"/Login"}>Already Have Account?</Link>
            
            </div>
        </div>    
         
    );    
}

export default Signup