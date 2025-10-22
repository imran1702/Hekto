import { createSlice } from '@reduxjs/toolkit'

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    cartItem: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
    favouriteItem: localStorage.getItem("favourite") ? JSON.parse(localStorage.getItem("favourite")) : [],
  },
  reducers: {
    addToCart: (state, action) => {
      let findProduct = state.cartItem.findIndex((item)=>item.id == action.payload.id)
      if(findProduct == -1){
        state.cartItem = [...state.cartItem, action.payload]
        localStorage.setItem("cart", JSON.stringify(state.cartItem))
      }else{
        state.cartItem[findProduct].qun += 1
        localStorage.setItem("cart", JSON.stringify(state.cartItem))
      }
    },
    increment: (state, action)=>{
      state.cartItem[action.payload].qun += 1
      localStorage.setItem("cart", JSON.stringify(state.cartItem))
    },
    decrement: (state, action)=>{
      if(state.cartItem[action.payload].qun > 1){
        state.cartItem[action.payload].qun -= 1
        localStorage.setItem("cart", JSON.stringify(state.cartItem))
      }
    },
    cartItemRemove: (state, action)=>{
      state.cartItem.splice(action.payload, 1)
      localStorage.setItem("cart", JSON.stringify(state.cartItem))
    },
    clearCartItem: (state, action)=>{
      state.cartItem.splice(action.payload)
      localStorage.setItem("cart", JSON.stringify(state.cartItem))
    },
    favouriteProduct: (state, action) => {
      let findProduct = state.favouriteItem.findIndex((item)=>item.id == action.payload.id)
      if(findProduct == -1){
        state.favouriteItem = [...state.favouriteItem, action.payload]
        localStorage.setItem("favourite", JSON.stringify(state.favouriteItem))
      }
    },
     favItemRemove: (state, action)=>{
      state.favouriteItem.splice(action.payload, 1)
      localStorage.setItem("favourite", JSON.stringify(state.favouriteItem))
    },
    clearFavItem: (state, action)=>{
      state.favouriteItem.splice(action.payload)
      localStorage.setItem("favourite", JSON.stringify(state.favouriteItem))
    },
    
  },
})

export const { addToCart, increment, decrement, cartItemRemove, clearCartItem, favouriteProduct, favItemRemove, clearFavItem } = productSlice.actions

export default productSlice.reducer