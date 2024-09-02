import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'
import Icons from '../../assets/icons'

import { useDispatch, useSelector } from 'react-redux'
import {
  setShowRegion,
  setMenuIndex,
  setShowSearch,
} from '../../redux/store/menu_slice'
import MenuView from '../menu_view'
import { RootState } from '../../redux'

function HeaderView() {
  const dispatch = useDispatch()
  const currentRegion = useSelector(
    (state: RootState) => state.menu.currentRegion
  )
  const menuIndex = useSelector((state: RootState) => state.menu.menuIndex)

  const searchHandle = () => {
    dispatch(setShowSearch(true))
  }

  const regionHandle = () => {
    dispatch(setShowRegion(true))
  }

  const handleMenuIndex = (index: number) => {
    dispatch(setMenuIndex(index))
  }

  return (
    <div>
      <div className='hearder-view-tip'>
        Mid-Season Sale | Up to 60% off an extensive range of world-class
        designer brands.
        <div style={{ textDecoration: 'underline' }}>Shop now</div>
      </div>
      <div className='hearder-view-bg' onClick={() => handleMenuIndex(-1)}>
        <div className='hearder-view-header'>
          <div
            style={{ display: 'flex', alignItems: 'center' }}
            onClick={regionHandle}
          >
            <img
              src={Icons.globe}
              style={{ height: '14px', marginRight: '8px' }}
              alt=''
            />
            <div>{currentRegion.currencyCode} $</div>
          </div>
          <Link to='/' className='hearder-view-logo'>
            <div>S H O P I F Y</div>
          </Link>
          <Link to='/account'>
            <img
              src={Icons.person}
              style={{ height: '16px', margin: '0 8px' }}
              alt=''
            />
          </Link>
          <Link to='/wishlist'>
            <img
              src={Icons.wishlist}
              style={{ height: '16px', margin: '0 8px' }}
              alt=''
            />
          </Link>
          <Link to='/cart'>
            <img
              src={Icons.bag}
              style={{ height: '16px', margin: '0 8px' }}
              alt=''
            />
          </Link>
        </div>
        <div
          className='hearder-view-menu'
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <div className='hearder-view-category'>
            <div
              className={
                menuIndex !== -1 && menuIndex !== 0
                  ? 'hearder-view-unselect-item'
                  : ''
              }
              onMouseEnter={() => handleMenuIndex(0)}
            >
              Women
            </div>
            <div
              className={
                menuIndex !== -1 && menuIndex !== 1
                  ? 'hearder-view-unselect-item'
                  : ''
              }
              onMouseEnter={() => handleMenuIndex(1)}
            >
              Men
            </div>
            <div
              className={
                menuIndex !== -1 && menuIndex !== 2
                  ? 'hearder-view-unselect-item'
                  : ''
              }
              onMouseEnter={() => handleMenuIndex(2)}
            >
              Kids
            </div>
            <div
              className={
                menuIndex !== -1 && menuIndex !== 3
                  ? 'hearder-view-unselect-item'
                  : ''
              }
              onMouseEnter={() => handleMenuIndex(3)}
            >
              Designers
            </div>
            <div
              className={
                menuIndex !== -1 && menuIndex !== 4
                  ? 'hearder-view-unselect-item'
                  : ''
              }
              onMouseEnter={() => handleMenuIndex(4)}
            >
              Sale
            </div>
          </div>
          <div className='hearder-view-search' onClick={searchHandle}>
            <div>Search</div>
            <img
              src={Icons.search}
              style={{ height: '16px', margin: '0 8px' }}
              alt=''
            />
          </div>
        </div>
      </div>
      <MenuView />
    </div>
  )
}

export default HeaderView
