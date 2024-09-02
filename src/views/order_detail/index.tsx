import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import Icons from '../../assets/icons'
import LoadingView from '../../components/loading_view'
import './index.css'
import { RootState } from '../../redux'
import { OrderNode } from '../../data/customer/model'

function OrderDetailView() {
  const [params] = useSearchParams()
  const customer = useSelector((state: RootState) => state.account.customer)
  const [detail, setDetail] = useState<OrderNode | null>(null)

  useEffect(() => {
    const orderId: string = params.get('orderId') as string
    if (customer != null) {
      setDetail(
        customer.orders.edges.filter((e) => e.node.id === orderId)[0].node
      )
    }
  }, [customer])

  return detail != null ? (
    <div className='order-view-bgc'>
      <div style={{ width: '160px', lineHeight: '30px', color: '#757575' }}>
        &lt; Back to orders
      </div>
      <div style={{ flex: '1', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: '700px', minHeight: '400px' }}>
          <div
            style={{ fontSize: '18px', lineHeight: '26px', fontWeight: 'bold' }}
          >
            Order #{detail.orderNumber}
          </div>
          <div style={{ lineHeight: '20px', color: '#757575' }}>
            {detail.processedAt.replace('T', ' ').replace('Z', '')}
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '48px',
            }}
          >
            <div style={{ width: '33%' }}>
              <div className='content-item'>Delivery Address</div>
              <div style={{ lineHeight: '20px', color: '#505050' }}>
                {detail.shippingAddress.name}
                <br />
                {detail.shippingAddress.address1}
                {detail.shippingAddress.address2}
                <br />
                {detail.shippingAddress.city}
                {detail.shippingAddress.province}
                {detail.shippingAddress.zip}
                <br />
                {detail.shippingAddress.phone}
              </div>
            </div>
            <div style={{ width: '33%' }}>
              <div className='content-item'>Payment</div>
              <div style={{ lineHeight: '20px', color: '#505050' }}>
                Ending 9879
              </div>
            </div>
            <div style={{ width: '33%' }}>
              <div className='content-item'>Order Summary</div>
              <div className='summary-item'>
                <div>Subtotal</div>
                <div>
                  {detail.subtotalPriceV2.currencyCode}
                  {detail.subtotalPriceV2.amount}
                </div>
              </div>
              <div className='summary-item'>
                <div>Shipping</div>
                <div>
                  {detail.totalShippingPriceV2.currencyCode}
                  {detail.totalShippingPriceV2.amount}
                </div>
              </div>
              <div className='summary-item'>
                <div>Taxes and duties</div>
                <div>
                  {detail.totalTaxV2.currencyCode}
                  {detail.totalTaxV2.amount}
                </div>
              </div>
              <div className='summary-item' style={{ fontWeight: 'bold' }}>
                <div>Total</div>
                <div>
                  {detail.totalPriceV2.currencyCode}
                  {detail.totalPriceV2.amount}
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              marginTop: '56px',
              lineHeight: '20px',
              fontWeight: 'bold',
              paddingBottom: '16px',
              borderBottom: '1px solid #eee',
            }}
          >
            Items(
            {[...detail.lineItems.edges].reduce((a, b) => {
              return a + b.node.quantity
            }, 0)}
            )
          </div>
          {detail.lineItems.edges.map((item) => (
            <div
              key={item.node.variant.title}
              style={{
                display: 'flex',
                paddingBottom: '12px',
                borderBottom: '1px solid #eee',
              }}
            >
              <img
                src={item.node.variant.image.url}
                style={{ width: '94px', height: '140px', objectFit: 'contain' }}
                alt=''
              />
              <div
                style={{
                  flex: '1',
                  marginLeft: '40px',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '140px',
                }}
              >
                <div>{item.node.variant.product.productType}</div>
                <div style={{ flex: '1' }}>{item.node.title}</div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '12px',
                    lineHeight: '16px',
                    color: '#757575',
                  }}
                >
                  <div>Size:{item.node.variant.title}</div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '12px',
                    lineHeight: '16px',
                    color: '#757575',
                  }}
                >
                  <div>Qty:{item.node.quantity}</div>
                  <div
                    style={{
                      color: '#212121',
                      fontSize: '14px',
                      fontWeight: 'bold',
                    }}
                  >
                    {item.node.originalTotalPrice.currencyCode}
                    {item.node.originalTotalPrice.amount}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div
            style={{
              height: '290px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img src={Icons.help} style={{ width: '24px' }} alt='' />
            <div
              style={{
                lineHeight: '20px',
                fontWeight: 'bold',
                marginTop: '8px',
              }}
            >
              Need help?
            </div>
            <div style={{ lineHeight: '20px', marginTop: '8px' }}>
              Our customer service team is available 7-days a week
            </div>
            <div
              style={{
                lineHeight: '20px',
                color: '#757575',
                textDecoration: 'underline',
                marginTop: '8px',
              }}
            >
              Help & Contact
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <LoadingView height={'400px'} />
  )
}

export default OrderDetailView
