import './index.css'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LoadingView from '../../components/loading_view'
import { RootState } from '../../redux'

function OrderView() {
  const customer = useSelector((state: RootState) => state.account.customer)
  const navigate = useNavigate()
  const loading = useSelector((state: RootState) => state.account.loading)

  function goToDetail(orderId: string) {
    navigate(`/order-detail?orderId=${orderId}`)
  }

  return (
    <div className='order-bgc'>
      {customer != null ? (
        <div className='bgw'>
          <div
            style={{
              fontSize: '18px',
              lineHeight: '26px',
              fontWeight: 'bold',
              marginBottom: '32px',
            }}
          >
            My Orders
          </div>
          {customer.orders.edges.map((item) => (
            <div
              key={item.node.id}
              style={{ borderTop: '1px solid #eee', padding: '12px 8px' }}
              onClick={() => {
                goToDetail(item.node.id)
              }}
            >
              <div
                style={{
                  lineHeight: '20px',
                  color: '#757575',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <div>#{item.node.orderNumber}</div>
                <div>
                  {item.node.totalPriceV2.currencyCode}
                  {item.node.totalPriceV2.amount}
                </div>
              </div>
              <div style={{ display: 'flex', margin: '8px 0' }}>
                {item.node.lineItems.edges.map((sItem) => (
                  <img
                    key={sItem.node.variant.image.url}
                    src={sItem.node.variant.image.url}
                    style={{
                      width: '44px',
                      height: '66px',
                      objectFit: 'contain',
                      marginRight: '8px',
                    }}
                    alt=''
                  />
                ))}
              </div>
              <div
                style={{
                  lineHeight: '20px',
                  color: '#757575',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  {[...item.node.lineItems.edges].reduce((a, b) => {
                    return a + b.node.quantity
                  }, 0)}
                  items
                </div>
                <div>View order detail</div>
              </div>
            </div>
          ))}
        </div>
      ) : loading ? (
        <LoadingView height={'400px'} />
      ) : null}
    </div>
  )
}

export default OrderView
