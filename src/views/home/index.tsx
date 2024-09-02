import './index.css'
import { kHomeMaps } from '../../data/home'
import SubscribeView from '../../components/subscribe_view'
import { useNavigate } from 'react-router-dom'

function HomeView() {
  const navigate = useNavigate()

  function goToProductList() {
    navigate('product-list')
  }

  return (
    <div className='bg'>
      {kHomeMaps.map((item) => {
        if (item.name === 'FirstSection') {
          return (
            <div
              key={item.name}
              className='first-section'
              onClick={goToProductList}
            >
              <img
                src='https://hbimg.b0.upaiyun.com/d5ffcc83ca2ef6f5878009a33e8f686a47ca28582cc78-WSFdfB_fw658'
                style={{ width: '50%' }}
                alt=''
              />
              <div className='first-section-right'>
                <div style={{ fontSize: '60px', lineHeight: '60px' }}>
                  BLACK FRIDAY:Up to 50% off
                </div>
                <div
                  style={{
                    fontSize: '20px',
                    lineHeight: '24px',
                    color: '#505050',
                    margin: '16px 0 40px',
                  }}
                >
                  Up to 50% off FW23 with an extra 10% off using code‘BLACK10’
                  at checkout
                </div>
                <div className='btn'>Shop now</div>
              </div>
            </div>
          )
        } else if (
          item.name === 'PopularSection' ||
          item.name === 'PrimarySection'
        ) {
          return (
            <div
              key={item.name}
              className='popular-section'
              onClick={goToProductList}
            >
              {item.items.map((sItem) => (
                <div key={sItem.brand} style={{ marginRight: '20px' }}>
                  <img
                    src='https://img.kuajingyan.com/home/2020-12-02/38100c7624beb631.png'
                    style={{ width: '100%' }}
                    alt=''
                  />
                  <div
                    style={{
                      marginTop: '16px',
                      fontSize: '20px',
                      lineHeight: '24px',
                    }}
                  >
                    {sItem.brand}
                  </div>
                  <div
                    style={{
                      marginTop: '4px',
                      fontSize: '16px',
                      lineHeight: '22px',
                      color: '#505050',
                    }}
                  >
                    {sItem.productName}
                  </div>
                  <div
                    style={{
                      marginTop: '16px',
                      fontSize: '14px',
                      lineHeight: '20px',
                      color: '#757575',
                      textDecoration: 'underline',
                    }}
                  >
                    Shop now
                  </div>
                </div>
              ))}
            </div>
          )
        } else if (
          item.name === 'NewArrivalSection' ||
          item.name === 'NewSeasonSection'
        ) {
          return (
            <div
              key={item.name}
              className='new-arrival-section'
              onClick={goToProductList}
            >
              <div
                style={{
                  marginTop: '16px',
                  fontSize: '32px',
                  lineHeight: '35px',
                  textAlign: 'center',
                }}
              >
                {item.title}
              </div>
              <div
                style={{
                  marginTop: '16px',
                  marginBottom: '40px',
                  fontSize: '16px',
                  lineHeight: '22px',
                  textAlign: 'center',
                }}
              >
                {item.subTitle}
              </div>
              <div style={{ display: 'flex' }}>
                {item.items.map((sItem) => (
                  <div
                    key={sItem.text}
                    style={{ marginRight: '20px', flex: '1' }}
                  >
                    <img
                      src='https://img.kuajingyan.com/home/2020-12-02/38100c7624beb631.png'
                      width='100%'
                      alt=''
                    />
                    <div
                      style={{
                        marginTop: '16px',
                        fontSize: '16px',
                        lineHeight: '22px',
                        textAlign: 'center',
                      }}
                    >
                      {sItem.text}
                    </div>
                  </div>
                ))}
              </div>
              <div className='btn_center'>Shop now</div>
            </div>
          )
        }
        return <div key={item.name}></div>
      })}
      <SubscribeView />
    </div>
  )
}

export default HomeView
