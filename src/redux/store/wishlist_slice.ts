import { createSlice } from '@reduxjs/toolkit'
import { Product } from '../../data/product/model/product_detail'

const initialState: { wishlist: Product[] } = {
  wishlist: (() => {
    const localWishlist = localStorage.getItem('KPublicWishlist')
    if (localWishlist == null) {
      return []
    } else {
      return JSON.parse(localWishlist)
    }
  })(),
}

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addWishlist: (state, action) => {
      const item = action.payload
      state.wishlist = [item, ...state.wishlist]
      localStorage.setItem('KPublicWishlist', JSON.stringify(state.wishlist))
    },
    removeWishlist: (state, action) => {
      const item = action.payload
      state.wishlist = state.wishlist.filter((e) => e.id !== item.id)
      localStorage.setItem('KPublicWishlist', JSON.stringify(state.wishlist))
    },
  },
})

export const { addWishlist, removeWishlist } = wishlistSlice.actions

export default wishlistSlice.reducer
