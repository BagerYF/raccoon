import { createSlice } from '@reduxjs/toolkit'

export const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    showSearch: false,
    showRegion: false,
    currentRegion: (() => {
      const localCountry = localStorage.getItem('KPublicCountry')
      if (localCountry == null) {
        return {
          name: 'China',
          code: 'CN',
          currencyCode: 'USD',
        }
      } else {
        return JSON.parse(localCountry)
      }
    })(),
    showMenu: false,
    menuIndex: -1,
  },
  reducers: {
    setShowSearch: (state, action) => {
      state.showSearch = action.payload
    },
    setShowRegion: (state, action) => {
      state.showRegion = action.payload
    },
    setCurrentRegion: (state, action) => {
      state.currentRegion = action.payload
      localStorage.setItem('KPublicCountry', JSON.stringify(action.payload))
    },
    setMenuIndex: (state, action) => {
      state.menuIndex = action.payload
      const index = action.payload
      if (index > -1) {
        state.showMenu = true
      } else {
        state.showMenu = false
      }
      state.menuIndex = index
    },
    setShowMenu: (state, action) => {
      state.showMenu = action.payload
    },
  },
})

export const {
  setShowSearch,
  setShowRegion,
  setCurrentRegion,
  setShowMenu,
  setMenuIndex,
} = menuSlice.actions

export default menuSlice.reducer
