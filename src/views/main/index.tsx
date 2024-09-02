// import React, { useEffect } from 'react'
import './index.css'
import HeaderView from '../../components/header_view'
import { Outlet } from 'react-router-dom'
import FooterView from '../../components/footer_view'
import RegionView from '../../components/region_view'
import SearchView from '../../components/search_view'
import { queryCustomer } from '../../redux/store/account_slice'
import { useEffect } from 'react'
import { useAppDispatch } from '../../redux/index'

function MainView() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(queryCustomer())
  }, [])

  return (
    <div className='main'>
      <HeaderView />

      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
      <FooterView />
      <SearchView />
      <RegionView />
    </div>
  )
}

export default MainView
