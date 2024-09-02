import Icons from '../../assets/icons'
import { Button, Col, Form, Input, Row } from 'antd'
import { useSelector } from 'react-redux'
import './index.css'
import { RootState } from '../../redux'
import { Checkout } from '../../data/checkout/model'
import { AddressObject } from '../../data/region'

function CheckboxPaymentView(props: {
  checkout: Checkout
  address: AddressObject
  placeOrder: () => void
  changeTabIndex: (index: number) => void
}) {
  const customer = useSelector((state: RootState) => state.account.customer)
  const { checkout, address, placeOrder, changeTabIndex } = props
  const [form] = Form.useForm()

  return checkout != null && checkout.shippingLine != null ? (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '32px',
        }}
      >
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
        <div
          className='bread-title-active'
          onClick={() => {
            changeTabIndex(1)
          }}
        >
          Shipping
        </div>
        <img
          src={Icons.arrow_right_grey}
          style={{ height: '11px', margin: '0 14px' }}
          alt=''
        />
        <div className='bread-title-active'>Payment</div>
      </div>

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

      <div style={{ borderTop: '1px solid #eee', margin: '8px 0' }}></div>
      <div style={{ fontSize: '12px', lineHeight: '17px', display: 'flex' }}>
        <div style={{ width: '60px', color: '#757575' }}>Method</div>
        <div style={{ color: '#424242' }}>{checkout.shippingLine.title}</div>
      </div>
      <div className='checkout-title'>Payment</div>
      <div className='sub-title'>All transactions are secure and encrypted</div>
      <div
        style={{
          padding: '16px',
          border: '1px solid #eee',
          borderRadius: '2px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px',
          }}
        >
          <div>Credit or Debit Card</div>
          <img src={Icons.cards} height='24px' alt='' />
        </div>
        <Form layout='vertical' form={form} requiredMark={false}>
          <Form.Item
            label='Card number'
            name='number'
            rules={[
              {
                required: true,
                message: 'Please input card number',
              },
            ]}
          >
            <Input
              style={{ height: '40px', borderRadius: '2px', fontSize: '14px' }}
              placeholder='Card number'
            />
          </Form.Item>
          <Form.Item
            label='Cardholder name'
            name='name'
            rules={[
              {
                required: true,
                message: 'Please input cardholder name',
              },
            ]}
          >
            <Input
              style={{ height: '40px', borderRadius: '2px', fontSize: '14px' }}
              placeholder='Cardholder name'
            />
          </Form.Item>
          <Row gutter={10} justify={'start'}>
            <Col span={6}>
              <Form.Item
                label='Expiration date'
                name='date'
                rules={[
                  {
                    required: true,
                    message: 'Please input expiration date',
                  },
                ]}
              >
                <Input
                  style={{
                    height: '40px',
                    borderRadius: '2px',
                    fontSize: '14px',
                  }}
                  placeholder='Expiration date'
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label='Security code'
                name='code'
                rules={[
                  {
                    required: true,
                    message: 'Please input security code',
                  },
                ]}
              >
                <Input
                  style={{
                    height: '40px',
                    borderRadius: '2px',
                    fontSize: '14px',
                  }}
                  placeholder='Security code'
                />
              </Form.Item>
            </Col>
            <img
              src={Icons.card}
              alt=''
              style={{ height: '36px', marginTop: '44px', marginLeft: '20px' }}
            />
          </Row>
        </Form>
      </div>
      <div className='checkout-title'>Billing Address</div>
      <div className='sub-title'>
        Select the address that matches your card or payment method
      </div>
      <div className='address-select'>
        <img src={Icons.select_y} style={{ width: '16px' }} alt='' />
        <div style={{ flex: '1', margin: '0 16px' }}>
          Same as shipping address
        </div>
      </div>
      <div className='address'>
        <img src={Icons.select_n} style={{ width: '16px' }} alt='' />
        <div style={{ flex: '1', margin: '0 16px' }}>
          Use different billing address
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
          }}
          onClick={() => {
            changeTabIndex(0)
          }}
        >
          <img src={Icons.arrow_left} style={{ height: '16px' }} alt='' />
          <div style={{ marginLeft: '6px' }}>Return to shipping</div>
        </div>
        <Button
          type='primary'
          className='checkout-btn'
          onClick={() => {
            placeOrder()
          }}
        >
          Place order
        </Button>
      </div>
    </div>
  ) : null
}

export default CheckboxPaymentView
