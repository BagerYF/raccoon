import { configureStore } from '@reduxjs/toolkit'
import menuReducer from './store/menu_slice'
import wishlistReducer from './store/wishlist_slice'
import cartReducer from './store/cart_slice'
import accountReducer from './store/account_slice'
import { useDispatch } from 'react-redux'

const store = configureStore({
  reducer: {
    menu: menuReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
    account: accountReducer,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
