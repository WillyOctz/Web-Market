import React from 'react'
import loading from '../Pages/Home.js'
import { Link } from "react-router-dom";
import { addCartItem } from '../redux/productSlide.js'
import { deleteCartItem } from '../redux/productSlide.js'
import { useDispatch } from 'react-redux';

const CardFeature = ({name,image,prices,categories,id}) => {
    const dispatch = useDispatch()
    const handleAddCartProduct = (e) => {
        {/*e.stopPropagation()*/}
        dispatch(addCartItem({
            _id : id,
            name : name,
            prices : prices,
            categories : categories,
            image : image
        }))
    
    }

    return (
        <div className='mt-3 min-w-[200px] max-w-[200px] bg-white hover:shadow-2xl py-4 pt-2 px-4 cursor-pointer flex flex-col rounded-lg'>
            {
             image ? (
            <>          
             <Link to={`/home/Product/${id}`} onClick={() => window.scrollTo({top: "0", behavior: "smooth"})}>
                <div className='mt-5 ml-1 h-28 flex flex-col justify-center items-center'>
                    <img src={image} className='h-full'/>
                </div>
                <h3 className='font-semibold text-slate-600 text-center capitalize text-lg overflow-hidden'>{name}</h3>
                <p className='text-center text-slate-500 font-medium'>{categories}</p>
                <p className='text-center font-bold'>
                    <span className='text-yellow-500'>{prices}</span>
                </p>
             </Link>
                <button className='button-32 mt-2 w-full' onClick={handleAddCartProduct}>Add To Cart</button>
            </>                  
              ) : (
             <div className='min-w-[200px]'>
                <p>{loading}</p>
             </div>   
            )}     
        </div>
    );    
}

export default CardFeature