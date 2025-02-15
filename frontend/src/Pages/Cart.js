import React from 'react'
import { useSelector } from 'react-redux'
import CartProduct from '../Components/cartProduct'
import EmptyCart from '../assets/images/cart_empty.png'
import toast from 'react-hot-toast'
import {loadStripe} from '@stripe/stripe-js'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
    const productCartItem = useSelector((state) => state.products.cartItem)
    //console.log(productCartItem)
    const cartItemsForStripe = productCartItem.map(item => ({
        ...item,
        prices: parseFloat(item.prices) // Ensure prices is a number
    }))
    const user = useSelector(state => state.user)
    //console.log(user)
    const navigate = useNavigate()

    const totalPrice = productCartItem.reduce((acc,curr)=>acc + parseFloat(curr.total),0)
    const totalQty = productCartItem.reduce((acc,curr)=>acc + parseInt(curr.qty),0)
    

    const handlePayment = async() => {
    
        if(user.email) {
            
            const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
            const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/checkout-payment`, {
                method : "POST",
                headers : {
                    "content-type" : "application/json"
                },
                body : JSON.stringify(productCartItem)
            })
            
            if(res.status === 500) {
                toast.error("Server Error. Please try again.");
                return;
            }
    
            const data = await res.json()
            //console.log(data)
            if (data && data !== '') {
                toast("Redirect To Payment Gateway...")
                stripePromise.redirectToCheckout({ sessionId : data })
            }
        } 
        else {
            toast("You Have Not Login Yet!")
            setTimeout(() => {
                navigate("/Login")
            }, 1000) 
        }
    }
    return (
        <div className='md:p-1 -mt-12'>
            <h2 className='text-lg md:text-2xl font-bold'>
                Your Cart Items :
            </h2>
            {productCartItem[0] ? 
            <div className='flex gap-3 '>
                {/* displaying cart items here */}
                <div className={`p-2 mt-3 overflow-hidden max-w-4xl w-full rounded object-cover ${productCartItem.length > 0 ? 'bg-sky-300' : ''}`}>
                    {productCartItem.length > 0 ? (
                        productCartItem.map(el => (
                            <CartProduct
                                key={el._id}
                                id={el._id}
                                name={el.name}
                                image={el.image}
                                categories={el.categories} 
                                qty={el.qty}
                                total={el.total}
                                prices={el.prices}
                            />
                        ))
                    ) : (

                        <p className="text-gray-600 font-bold text-lg mt-2">Your cart is empty,bruh</p>

                    )}
                </div>

                {/* total items quantity */}
                <div className='mt-3 w-full max-w-md bg-gradient-to-r from-blue-200 to-cyan-200 ml-auto py-4 p-2 flex flex-col items-center rounded' style={{ maxHeight: '35vh', overflowY: 'auto' }}>
                    <h2 className='text-center text-lg font-semibold'>
                        Summary
                    </h2>
                    <div className='mt-5 flex w-full text-md border-2 border-sky-500'>
                        <p>Total Qty :</p>
                        <p className='ml-auto w-32 font-bold'>{totalQty}</p>
                    </div>
                    <div className='mt-2 flex w-full text-md border-2 border-sky-500'>
                        <p>Total Price :</p>
                        <p className='ml-auto w-32 font-bold'>${totalPrice}</p>
                    </div>
                    <button className='button-33 mt-3 w-2/3 mt-auto' onClick={handlePayment}>Pay Now</button>
                </div>
            </div>

            :
    
            <div className="flex w-full justify-center items-center flex-col">
                <img src={EmptyCart} className="w-full max-w-lg"/>
                <p className='text-3xl font-bold'>Cart Is Empty</p>
            </div>
            
            }
        </div>
    );    
}

export default Cart