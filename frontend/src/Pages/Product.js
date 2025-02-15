import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AllProduct from '../Components/AllProduct';
import { useDispatch } from 'react-redux';
import { addCartItem } from '../redux/productSlide.js'

const Product = () => {
    const { FilterBy } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const productData = useSelector((state) => state.products.productList)
   
    const productDisplay = productData.filter(el => el._id === FilterBy)[0]
    

        const handleAddCartProduct = (e) => {
            {/*e.stopPropagation()*/}
            dispatch(addCartItem(productDisplay))
        }
    
    const handleBuy = () => {
        dispatch(addCartItem(productDisplay))
        navigate("/Cart")
        
    }
    
    return (
        <div className=''>
            <div className='w-full max-w-4xl m-auto md:flex bg-white rounded-lg'>
                <div className='overflow-hidden max-w-lg p-5'>
                    <img src={productDisplay.image} className='hover:scale-105 transition-all w-[250px] h-[270px]' alt=""/>
                </div>
                <div className='p-4 flex flex-col'>
                    <h3 className='font-semibold text-slate-600 capitalize text-3xl overflow-hidden'>{productDisplay.name}</h3>
                    <p className='text-slate-500 font-medium text-xl'>{productDisplay.categories}</p>
                    <p className='font-bold'>
                        <span className='text-yellow-500 text-xl'>{productDisplay.prices}</span>
                    </p>
                    <div className='mt-2'>
                        <p className='font-bold text-xl'>Description :</p>
                        <p className='font-semibold'>{productDisplay.description}</p>
                    </div>
                    <div className='flex flex-col gap-1 mt-1'>
                        <button onClick={handleBuy} className='button-32 mt-2'>Buy Now</button>
                        <button onClick={handleAddCartProduct} className='button-32 mt-2'>Add To Cart</button>
                    </div>
                </div>
            </div>

            <AllProduct heading={"Other Products"}/>
        </div>
    );    
}

export default Product