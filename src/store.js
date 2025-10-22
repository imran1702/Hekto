import { configureStore } from '@reduxjs/toolkit'
import productSlice from './components/slices/productSlice'

export default configureStore({
  reducer: {
    product: productSlice
  },
})