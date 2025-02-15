import React , { useState, useEffect } from 'react'
import Signimage from '../assets/images/user_profile.png';
import { BiShowAlt } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { Link } from "react-router-dom";
import './Signup.js';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import '../globals.css';
import { useDispatch, useSelector } from 'react-redux';
import { loginRedux } from '../redux/userSlice.js';
import axios from 'axios';

const Login = () => {
    const [showPassword,setShowPassword] = useState(false);
        const [data,setData] = useState(
            {
                email : "",
                password : "",
            })
        const navigate = useNavigate()      
        
        
        const dispatch = useDispatch()   

        const handleShowPassword = () => {
            setShowPassword(prev => !prev)
        }   
        const handleOnChange = (z) => {
            
            const {name,value} = z.target
            setData((prev) => {
                
                return {
                    ...prev,
                    [name] : value
                }    
            })
        }
    
        const handleOnSubmit = async(e) => {
            e.preventDefault()
            const {email,password} = data
            if (email && password) {
                try {
                
                    const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/Login`,{
                        method : "POST",
                        headers : {
                            "content-type" : "application/json"
                        },
                        body : JSON.stringify(data)
                    });

                    const dataRes = await fetchData.json()
                    //console.log("Backend Response :", dataRes)
                    toast(dataRes.message)
                
                    if (dataRes.alert && dataRes.user) {
                        dispatch(loginRedux({ data : dataRes.user }))
                        localStorage.setItem("user", JSON.stringify(dataRes.user)) 
                    
                        setTimeout(() => {
                            navigate("/Home")
                        }, 1000)      
                    }
                
                }
            catch (err) {
                console.err("Login Error :", err)
                toast("Login Error! Check Your Internet Connection")
            }
        }
            else {
                alert("Please Fill The Required Form!")
            }
        };

        const userData = useSelector((state) => state.user) || JSON.parse(localStorage.getItem("user"));

        useEffect(() => {
            console.log(userData);
        }, [userData]);

    return (
          <div className='-mt-12'>
                   <div className='w-full max-w-sm m-auto items-center flex flex-col p-4 mt-8 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#00a388] via-[#79bd8f] to-[#beeb9f] rounded-xl'>
                       <h1 className='text-center text-3xl font-extrabold font-serif'>Login Page</h1>
                       <div className='w-20 overflow-hidden drop-shadow-md shadow-md mt-10 rounded-full'>
                           <img src={Signimage} className='w-full'/>
                       </div>
       
                       <form className='w-full py-2 flex flex-col' onSubmit={handleOnSubmit}>
                           <label htmlFor='email'>Email</label>
                           <input type={"email"}id="email" name="email" className='w-full bg-transparent border rounded-lg shadow border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 px-2 py-1 mt-2 rounded mb-2 block w-full appearance-none leading-normal focus-within:outline-blue-400' value={data.email} onChange={handleOnChange}></input>
                           
                           <label htmlFor='password'>Password</label>
                           <div className='flex px-2 py-1 bg-transparent border rounded-lg shadow border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded mt-2 mb-2 focus-within:outline focus-within:outline-blue-400'>
                               <input type={showPassword ? "text":"password"} id="password" name="password" className='w-full bg-transparent border rounded-lg shadow border-gray-500 focus:border-indigo-500 border-none outline-none block w-full appearance-none leading-normal' value={data.password} onChange={handleOnChange}></input>
                               <span className='flex text-xl' onClick={handleShowPassword}>
                                   {showPassword ? <BiShowAlt/> : <BiHide/>}</span>
                           </div>
                           <button className='w-full max-w-[150px] m-auto bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#106ee8] via-[#0fc1a1] to-[#90e0ab] cursor-pointer text-xl font-semibold text-center py-1 rounded-full mt-4 shadow-md hover:shadow-lg transition duration-300 ease-in-out'>Login</button>

                           <Link className='mt-4 underline text-blue-600 hover:text-blue-700 text-center' to={"/Signup"}>Don't Have Account?</Link>
                       </form>
                   </div>
               </div>    
                );    
            }

export default Login