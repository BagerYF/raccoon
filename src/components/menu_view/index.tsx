import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setShowMenu, setMenuIndex } from '../../redux/store/menu_slice'
import './index.css'
import { kCategoryMaps } from '../../data/menu/index'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../redux'

function MenuView() {
  const dispatch = useDispatch()
  const menuIndex = useSelector((state: RootState) => state.menu.menuIndex)
  const [alphaArray, setAlphaArray] = useState<string[]>([])
  const navigate = useNavigate()

  const handleShow = (show: boolean) => {
    dispatch(setShowMenu(show))
  }

  const handleMenuIndex = async (index: number) => {
    dispatch(setMenuIndex(index))
  }

  useEffect(() => {
    const tempArray = ['0-9', '']
    for (let i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i++) {
      tempArray.push(String.fromCharCode(i))
    }
    setAlphaArray(tempArray)
  }, [])

  return (
    <>
      {menuIndex > -1 ? (
        <div className='menu-view-bgw'>
          <div
            className='menu-view-bgc'
            onMouseEnter={() => handleShow(true)}
            onMouseLeave={() => handleMenuIndex(-1)}
          >
            <div className='menu-view-content'>
              {kCategoryMaps[menuIndex].children.map((item) => (
                <div className='menu-view-category_c' key={item.name}>
                  <div style={{ marginBottom: '24px' }}>{item.name}</div>
                  {item.children.map((sItem) => (
                    <div className='menu-view-sub-category' key={sItem.name}>
                      {sItem.name}
                    </div>
                  ))}
                </div>
              ))}

              {menuIndex === 3 ? (
                <div
                  onClick={() => {
                    navigate('/designers')
                    handleMenuIndex(-1)
                  }}
                >
                  <div
                    style={{
                      marginTop: '8px',
                      marginBottom: '24px',
                      lineHeight: '20px',
                    }}
                  >
                    Designers A-Z
                  </div>
                  <div className='menu-view-alpha-bg'>
                    {alphaArray.map((e) => (
                      <div className='menu-view-alpha-item' key={e}>
                        {e}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default MenuView
