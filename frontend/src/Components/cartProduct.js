import React from 'react'
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { deleteCartItem,increaseQty,decreaseQty } from '../redux/productSlide';

const CartProduct = ({id, name, image, categories, qty, total, prices}) => {
    const dispatch = useDispatch()

    return (
        <div className='bg-sky-200 mt-2 p-2 flex items-start rounded border-2 border-sky-300'>
            <div classname=''>
                <img src={image} className='w-40 h-40 object-cover rounded overflow-hidden'/>
            </div>
            <div className='flex justify-between'>
                <div className='p-2 flex flex-col ml-5'>
                    <h3 className='font-semibold text-slate-600 capitalize text-xl overflow-hidden'>{name}</h3>
                    <p className='font-bold'>
                        <span className='text-yellow-500'>${parseFloat(prices).toFixed(1)}/each</span>
                    </p>
                    <div className='flex gap-3 mt-1 items-center'>
                        <button onClick={()=>dispatch(increaseQty(id))} className='button-32 mt-2'><FiPlus /></button>
                        <p className='font-semibold p-1'>{qty}</p>
                        <button onClick={()=>dispatch(decreaseQty(id))} className='button-32 mt-2'><FiMinus /></button>
                    </div>
                </div>
                <div className='flex gap-1 mt-auto -mb-12'>
                    <p className='font-bold'>Total :</p>
                    <p className='font-semibold'>${parseFloat(total).toFixed(1)}</p>
                </div>
            </div>
            <div className='flex ml-auto cursor-pointer hover:text-red-500' onClick={()=>dispatch(deleteCartItem(id))}>
                <MdDelete size={24}/>
            </div>
        </div>
    );    
}

export default CartProduct