import Icons from '../../assets/icons'
import { useSelector } from 'react-redux'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { Checkout } from '../../data/checkout/model'
import { AddressObject } from '../../data/region'
import { RootState } from '../../redux'

function CheckoutCompleteView(props: {
  checkout: Checkout
  address: AddressObject
}) {
  const customer = useSelector((state: RootState) => state.account.customer)
  const { checkout, address } = props
  const navigate = useNavigate()

  return (
    <div>
      <img src={Icons.success} style={{ height: '48px' }} alt='' />
      <div style={{ marginTop: '8px', fontSize: '12px', lineHeight: '16px' }}>
        Order #9999
      </div>
      <div style={{ fontSize: '20px', lineHeight: '24px' }}>
        Thank you {customer?.displayName}
      </div>
      <div className='checkout-title'>Customer information</div>

      <div className='content-item'>
        <div style={{ fontWeight: 'bold' }}>Email</div>
        <div style={{ color: '#616161' }}>{customer?.email}</div>
      </div>
      <div className='content-item'>
        <div style={{ fontWeight: 'bold' }}>Shipping address</div>
        <div style={{ color: '#616161' }}>
          {address.firstName} {address.lastName}
          {address.address1} {address.address2}
          {address.city} {address.province}
          {address.country} {address.zip}
        </div>
      </div>
      <div className='content-item'>
        <div style={{ fontWeight: 'bold' }}>Delivery method</div>
        <div style={{ color: '#616161' }}>{checkout.shippingLine.title}</div>
      </div>
      <div className='content-item'>
        <div style={{ fontWeight: 'bold' }}>Payment method</div>
        <div style={{ color: '#616161' }}>ending with 4444</div>
      </div>
      <div className='content-item'>
        <div style={{ fontWeight: 'bold' }}>Billing address</div>
        <div style={{ color: '#616161' }}>
          {address.firstName} {address.lastName}
          {address.address1} {address.address2}
          {address.city} {address.province}
          {address.country} {address.zip}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: '64px 0',
        }}
      >
        <div
          style={{
            marginRight: '24px',
            display: 'flex',
            alignItems: 'center',
            fontSize: '12px',
          }}
        >
          <div>Need help?</div>
          <div style={{ fontWeight: 'bold', marginLeft: '4px' }}>
            Contact us
          </div>
        </div>
        <Button
          type='primary'
          className='checkout-btn'
          onClick={() => {
            navigate('/')
          }}
        >
          Continue to Shopping
        </Button>
      </div>
    </div>
  )
}

export default CheckoutCompleteView
