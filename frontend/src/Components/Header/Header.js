import React, { useState } from "react";
import logo from "../../assets/images/market-logo.png";
import { Link, useNavigate } from "react-router-dom";
import {FaUserCircle} from 'react-icons/fa';
import { TiShoppingCart } from "react-icons/ti";
import '../Header/header.css';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRedux } from "../../redux/userSlice";
import { toast } from 'react-hot-toast';
import loginprof from "../../assets/images/avatar_profile.png"

const Header = () => {
    const [showMenu,setShowMenu] = useState(false);
    const userData = useSelector((state) => state.user)
    /*console.log(userData)*/
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleShowMenu = () => {
        setShowMenu(prev => !prev)
    }
    
    const handleLogout = () => {
        localStorage.removeItem("user")
        dispatch(logoutRedux())
        toast("Logout Success!")
        navigate("/Login")
    }

    /*console.log(process.env.REACT_APP_ADMIN_EMAIL*/
    const cartItemNumber = useSelector((state) => state.products.cartItem)
    return (
        <header className='relative shadow-md w-full h-21 bg-gradient-to-r from-slate-50 to-green-300'>
            {/* taskbar upper */}

            <div className="flex items-center h-full justify-between">
                <Link tp={""}>
                    <div className='h-13'>
                        <img src={logo} className="h-full"/>
                    </div>
                </Link>
                <div className="flex items-center gap-5 md:gap-7">
                    <nav className="gap-2 md:gap-12 text-base md:text-lg hidden md:flex">
                        <Link to={'Home'} className="link1">Home</Link>
                        <Link to={'Newspage'} className="link2">News</Link>
                        <Link to={'About'} className="link3">About</Link>
                        <Link to={'Blog'} className="link4">Blog</Link>
                    </nav>
                    <div className="text-3xl ml-7 mr-2 text-cyan-600 relative cursor-pointer">
                        <Link to={"Cart"}><TiShoppingCart />
                        <div className="absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-sm text-center">
                            {cartItemNumber.length}
                        </div>
                        </Link>
                    </div>
                    <div className="text-3xl mr-6" onClick={handleShowMenu}>
                        <div className="border-1 border-solid p-1 rounded-full cursor-pointer w-10 h-10">
                            <img src={userData?.image ? `${process.env.REACT_APP_SERVER_DOMAIN}${userData.image}` : loginprof} className="h-full w-full rounded-full overflow-hidden drop-shadow-md"/> 
                        </div>
                        {
                            showMenu && 
                            (
                            <div className="absolute right-2 bg-gradient-to-r from-slate-50 to-green-300 py-2 px-1 shadow drop-shadow-md flex-col flex text-lg min-w-[120px] text-center object-cover z-50">
                                {
                                    userData.email === process.env.REACT_APP_ADMIN_EMAIL && <Link to={"Newproduct"} className="whitespace-nowrap cursor-pointer linked">Upload Product</Link>
                                }

                                {
                                    userData.email ? <p className="cursor-pointer linked" onClick={handleLogout}>Logout</p> : <Link to={"Login"} className="whitespace-nowrap cursor-pointer linked">Login</Link>
                                }
                                <Link to={"Userprofile"} className="whitespace-nowrap cursor-pointer linked border-b-4 border-blue-500">User Profile</Link>
                                <nav className="md:text-lg flex flex-col py-2">
                                    <Link to={'Home'} className="link1">Home</Link>
                                    <Link to={'Newspage'} className="link2">News</Link>
                                    <Link to={'About'} className="link3">About</Link>
                                    <Link to={'Blog'} className="link4">Blog</Link>
                                </nav>
                            </div>
                            )
                        }
                    </div>
                </div>
            </div>

            {/* below */}
        </header>
    );
}

export default Header;