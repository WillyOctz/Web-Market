import React from 'react'
import paymentdone from '../assets/images/success.gif'
import { useNavigate } from 'react-router-dom';

const Success = () => {
    
    const navigate = useNavigate()

    setTimeout(() => {
        navigate("/Home")
    }, 3000) 

    return (
        <div className='mt-9 text-lg font-semibold bg-gradient-to-r from-blue-200 to-cyan-200 m-auto w-full max-w-sm h-32 flex justify-center items-center'>
            <img src={paymentdone} className=''/>
            Payment Is Successful!
        </div>
    );    
}

export default Success