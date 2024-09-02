import { createSlice } from '@reduxjs/toolkit'
import { Cart } from '../../data/cart/model'

const initialState: { cart: Cart | null } = {
  cart: (() => {
    const localCart = localStorage.getItem('KPublicCart')
    if (localCart == null) {
      return null
    } else {
      return JSON.parse(localCart)
    }
  })(),
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action) => {
      const tempCart = action.payload
      if (tempCart.lines.edges.length > 0) {
        state.cart = tempCart
        localStorage.setItem('KPublicCart', JSON.stringify(tempCart))
      } else {
        state.cart = null
        localStorage.removeItem('KPublicCart')
      }
    },
  },
})

export const { setCart } = cartSlice.actions

export default cartSlice.reducer
