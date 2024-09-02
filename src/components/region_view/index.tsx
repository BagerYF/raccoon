import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentRegion, setShowRegion } from '../../redux/store/menu_slice'
import Icons from '../../assets/icons'
import { Input, Modal } from 'antd'
import kCountryMaps, { CountryObject } from '../../data/region'
import { RootState } from '../../redux'

const RegionView: React.FC = () => {
  const dispatch = useDispatch()
  const showRegion = useSelector((state: RootState) => state.menu.showRegion)
  const currentRegion = useSelector(
    (state: RootState) => state.menu.currentRegion
  )
  const [showData, setShowData] = useState<CountryObject[]>([])

  const handleCancel = () => {
    dispatch(setShowRegion(false))
  }

  useEffect(() => {
    initData()
  }, [])

  function initData() {
    const currencyCountry: CountryObject = kCountryMaps.filter(
      (e) => e.code === currentRegion.code
    )[0]

    const originalData = [
      currencyCountry,
      ...kCountryMaps.filter((e) => e.code !== currentRegion.code),
    ]

    setShowData(originalData)
  }

  function getImgUrl(code: string) {
    return `https://d1mp1ehq6zpjr9.cloudfront.net/static/images/flags/${
      code || ''
    }.png`
  }

  function searchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const str = e.target.value
    if (str === '') {
      setShowData(kCountryMaps)
    } else {
      const filterData = kCountryMaps.filter((e) =>
        e.name.toLocaleLowerCase().includes(str.toLocaleLowerCase())
      )
      setShowData(filterData)
    }
  }

  function selectCountry(item: CountryObject) {
    dispatch(setCurrentRegion(item))
    handleCancel()
  }

  return (
    <>
      <Modal
        footer={null}
        closable={false}
        open={showRegion}
        width={'450px'}
        onCancel={handleCancel}
      >
        <div
          style={{
            height: '700px',
            width: '450px',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: '0 16px',
              height: '52px',
            }}
          >
            <div style={{ fontSize: '16px' }}>Region</div>
            <img
              src={Icons.cross}
              style={{ width: '16px' }}
              onClick={handleCancel}
              alt=''
            />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              margin: '0 16px',
              height: '36px',
              color: '#505050',
            }}
          >
            Change your shipping destination and currency
          </div>
          <Input
            placeholder='Search for a country or region'
            style={{
              margin: '8px 16px 16px',
              width: 'calc(100% - 32px)',
              height: '36px',
            }}
            suffix={
              <img src={Icons.search_g} style={{ width: '24px' }} alt='' />
            }
            onChange={searchChange}
          />
          <div style={{ flex: '1', overflow: 'scroll' }}>
            {showData.map((e) => (
              <div
                key={e.name}
                style={{
                  display: 'flex',
                  margin: '0 16px',
                  alignItems: 'center',
                  height: '40px',
                  borderBottom: '#e0e0e0 1px solid',
                }}
                onClick={() => {
                  selectCountry(e)
                }}
              >
                <img
                  src={getImgUrl(e.code)}
                  style={{ width: '18px', borderRadius: '9px' }}
                  alt=''
                />
                <div style={{ flex: '1', margin: '0 12px' }}>{e.name}</div>
                <div style={{ color: '#757575' }}>
                  {e.code === currentRegion.code ? 'Selected · ' : ''}
                  {e.currencyCode} $
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </>
  )
}

export default RegionView
