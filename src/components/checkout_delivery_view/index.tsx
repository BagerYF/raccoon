import './index.css'
import Icons from '../../assets/icons'
import { useSelector } from 'react-redux'
import { Button } from 'antd'
import { RootState } from '../../redux'
import { Checkout, ShippingRate } from '../../data/checkout/model'
import { AddressObject } from '../../data/region'

function CheckoutDeliveryView(props: {
  checkout: Checkout
  address: AddressObject
  checkoutShippingLineUpdate: (item: ShippingRate) => Promise<void>
  deliveryNext: () => void
  changeTabIndex: (index: number) => void
}) {
  const customer = useSelector((state: RootState) => state.account.customer)
  const {
    checkout,
    address,
    checkoutShippingLineUpdate,
    deliveryNext,
    changeTabIndex,
  } = props

  return checkout.availableShippingRates != null ? (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div
          className='bread-title-active'
          onClick={() => {
            changeTabIndex(0)
          }}
        >
          Information
        </div>
        <img
          src={Icons.arrow_right_grey}
          style={{ height: '11px', margin: '0 14px' }}
          alt=''
        />
        <div className='bread-title-active'>Shipping</div>
        <img
          src={Icons.arrow_right_grey}
          style={{ height: '11px', margin: '0 14px' }}
          alt=''
        />
        <div className='bread-title'>Payment</div>
      </div>
      <div className='checkout-title'>Shipping Method</div>

      <div style={{ fontSize: '12px', lineHeight: '17px', display: 'flex' }}>
        <div style={{ width: '60px', color: '#757575' }}>Contact</div>
        <div style={{ color: '#424242' }}>{customer?.email}</div>
      </div>
      <div style={{ borderTop: '1px solid #eee', margin: '8px 0' }}></div>
      <div
        style={{
          fontSize: '12px',
          lineHeight: '17px',
          display: 'flex',
          marginBottom: '50px',
        }}
      >
        <div style={{ width: '60px', color: '#757575' }}>Ship to</div>
        <div style={{ color: ' #424242' }}>
          {address.firstName} {address.lastName}
          {address.address1} {address.address2}
          {address.city} {address.province}
          {address.country} {address.zip}
        </div>
      </div>
      {checkout.availableShippingRates.shippingRates.map((item) => (
        <div
          key={item.title}
          className={
            checkout.shippingLine != null &&
            checkout.shippingLine.handle === item.handle
              ? 'method-item-select'
              : 'method-item'
          }
          onClick={() => {
            if (
              checkout.shippingLine == null ||
              checkout.shippingLine.handle !== item.handle
            ) {
              checkoutShippingLineUpdate(item)
            }
          }}
        >
          <img
            src={
              checkout.shippingLine != null &&
              checkout.shippingLine.handle === item.handle
                ? Icons.select_y
                : Icons.select_n
            }
            style={{ width: '16px' }}
            alt=''
          />
          <div style={{ flex: '1', margin: '0 16px' }}>{item.title}</div>
          <div style={{ fontWeight: 'bold' }}>
            {item.priceV2.currencyCode} {item.priceV2.amount}
          </div>
        </div>
      ))}

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
          }}
          onClick={() => {
            changeTabIndex(0)
          }}
        >
          <img src={Icons.arrow_left} style={{ height: '16px' }} alt='' />
          <div style={{ marginLeft: '6px' }}>Return to information</div>
        </div>
        <Button
          type='primary'
          className='checkout-btn'
          onClick={() => {
            deliveryNext()
          }}
        >
          Continue to payment
        </Button>
      </div>
    </div>
  ) : null
}

export default CheckoutDeliveryView
