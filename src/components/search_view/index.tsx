import Modal from 'antd/es/modal/Modal'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setShowSearch } from '../../redux/store/menu_slice'
import Icons from '../../assets/icons'
import { Input } from 'antd'
import { RootState } from '../../redux'

function SearchView() {
  const dispatch = useDispatch()
  const showSearch = useSelector((state: RootState) => state.menu.showSearch)
  const [searchHistory, setSearchHistory] = useState([])

  const handleCancel = () => {
    dispatch(setShowSearch(false))
  }

  useEffect(() => {
    initSearchHistory()
  }, [])

  function initSearchHistory() {
    let showData = []
    const localSearch = localStorage.getItem('kPublicSearchHistory')
    if (localSearch != null) {
      showData = JSON.parse(localSearch)
    }
    setSearchHistory(showData)
  }

  const searchHandle = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const str = (e.target as HTMLInputElement).value
    if (str.length > 0) {
      let showData = []
      const localSearch = localStorage.getItem('kPublicSearchHistory')
      if (localSearch != null) {
        showData = JSON.parse(localSearch)
      }
      const index = showData.indexOf(str)
      if (index !== -1) {
        showData.splice(index, 1)
      }
      showData.unshift(str)
      localStorage.setItem('kPublicSearchHistory', JSON.stringify(showData))

      initSearchHistory()
    }
  }

  const clearHistory = () => {
    localStorage.removeItem('kPublicSearchHistory')

    initSearchHistory()
  }

  return (
    <Modal
      footer={null}
      closable={false}
      open={showSearch}
      style={{ top: '0', margin: '0', padding: '0', maxWidth: '100%' }}
      width={'100%'}
      onCancel={handleCancel}
    >
      <div style={{ backgroundColor: 'white', width: '100%' }}>
        <div style={{ padding: '60px 250px', backgroundColor: '#fff' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: '40px',
            }}
          >
            <Input
              placeholder='Search Shopify'
              style={{ width: '500px', height: '40px', border: 'none' }}
              prefix={
                <img
                  src={Icons.search}
                  style={{ width: '14px', marginRight: '8px' }}
                  alt=''
                />
              }
              onPressEnter={searchHandle}
            />
            <img src={Icons.cross} style={{ width: '20px' }} alt='' />
          </div>
          {searchHistory.length > 0 ? (
            <div style={{ marginLeft: '10px', marginTop: '20px' }}>
              <div style={{ fontSize: '12px', color: '#757575' }}>
                Recent searches
              </div>
              {searchHistory.map((e) => (
                <div
                  style={{
                    fontSize: '12px',
                    lineHeight: '16px',
                    margin: '14px 0',
                  }}
                  key={e}
                >
                  {e}
                </div>
              ))}
              <div
                style={{ fontSize: '12px', color: '#757575' }}
                onClick={clearHistory}
              >
                Clear all
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </Modal>
  )
}

export default SearchView
