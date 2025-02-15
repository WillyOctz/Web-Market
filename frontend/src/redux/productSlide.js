import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
    productList : [],
    cartItem : [],
}

export const productSlide = createSlice({
    name : "products",
    initialState,
    reducers : {
        setDataproduct : (state,action) => {
   
            state.productList = [...action.payload]
        },

        addCartItem : (state,action) => {
            const check = state.cartItem.some(el => el._id === action.payload._id)
            if (check) {
                toast("Item Already In The Cart")
            }
            else {
                toast("Item Added!")
                const price = parseFloat(action.payload.prices) // Convert prices to a number
                const total = price
                state.cartItem = [...state.cartItem,{...action.payload,qty : 1, total : total}]
            }
        },

        deleteCartItem : (state,action) => {
            toast("Item Deleted")
            const index = state.cartItem.findIndex((el) => el._id === action.payload)
            state.cartItem.splice(index,1)
        },

        increaseQty : (state,action) => {
            const index = state.cartItem.findIndex((el) => el._id === action.payload)
            let qty = state.cartItem[index].qty
            const qtyPlus = ++qty
            state.cartItem[index].qty = qtyPlus

            const price = parseFloat(state.cartItem[index].prices); // Convert prices to a number
            const total = price * qtyPlus
            state.cartItem[index].total = total
        },

        decreaseQty : (state,action) => {
            const index = state.cartItem.findIndex((el) => el._id === action.payload)
            let qty = state.cartItem[index].qty
            if (qty > 1) {
                const qtyMinus = --qty
                state.cartItem[index].qty = qtyMinus
                
                const price = parseFloat(state.cartItem[index].prices); // Convert price to a number
                const total = price * qtyMinus
                state.cartItem[index].total = total
            }
        }
    }
})

export const { setDataproduct, addCartItem, deleteCartItem, increaseQty, decreaseQty } = productSlide.actions

export default productSlide.reducer;