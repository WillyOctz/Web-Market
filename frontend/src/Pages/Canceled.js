import React from 'react'
import paymentcancel from '../assets/images/failed.gif'
import { useNavigate } from 'react-router-dom';

const Canceled = () => {
    
    const navigate = useNavigate()

    setTimeout(() => {
        navigate("/Cart")
    }, 3000) 

    return (
        <div className='mt-9 text-lg font-semibold bg-gradient-to-r from-rose-400 to-red-500 m-auto w-full max-w-sm h-32 flex justify-center items-center'>
            <img src={paymentcancel} className=''/>
            Payment Is Canceled
        </div>
    );    
}

export default Canceled