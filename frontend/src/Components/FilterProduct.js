import React from 'react'
import { MdOutlineFilterAlt } from "react-icons/md";
import isActive from '../Components/AllProduct';

const FilterProduct = ({categories,onClick,isActive}) => {
    return (
        <div className='flex flex-col items-center w-20' onClick={onClick}>  
            <div className={`text-3xl mt-3 rounded-full p-3 ml-2 cursor-pointer ${isActive ? "bg-blue-400 text-white" : "bg-green-500"}`}>
                <MdOutlineFilterAlt/>
            </div>
            <p className='text-center font-medium capitalize ml-1'>
                {categories}
            </p>
        
        </div>
    );    
}

export default FilterProduct