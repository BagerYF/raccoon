import { useState } from 'react'
import Icons from '../../assets/icons'
import './index.css'
import { Input } from 'antd'
import { Checkout } from '../../data/checkout/model'

function CheckoutInfoView(props: {
  checkout: Checkout
  tabIndex: number
  checkoutDiscountCodeApply: (code: string) => Promise<boolean>
  checkoutDiscountCodeRemove: () => Promise<void>
}) {
  const [discount, setDiscount] = useState<string | null>(null)
  const [discountInput, setDiscountInput] = useState<string>('')
  const {
    checkout,
    tabIndex,
    checkoutDiscountCodeApply,
    checkoutDiscountCodeRemove,
  } = props

  async function applyDiscountHandle() {
    const tempDiscount = discountInput
    console.log(discountInput)
    if (tempDiscount.length > 0) {
      const result = await checkoutDiscountCodeApply(discountInput)
      if (result) {
        setDiscount(tempDiscount)
      }
    }
  }

  async function removeDiscountHandle() {
    await checkoutDiscountCodeRemove()
    setDiscount(null)
  }

  function discountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const str = e.target.value
    setDiscountInput(str)
  }

  return (
    <div>
      {tabIndex !== 3 ? (
        <div>
          <div
            style={{
              fontSize: '12px',
              lineHeight: '16px',
              marginBottom: '6px',
            }}
          >
            Add a gift code or discount code
          </div>
          <div style={{ display: 'flex' }}>
            <Input
              placeholder='Code Number'
              style={{
                marginRight: '8px',
              }}
              onChange={discountChange}
            />
            <div className='apply-btn' onClick={applyDiscountHandle}>
              Apply
            </div>
          </div>
          {discount != null ? (
            <div className='discount' onClick={removeDiscountHandle}>
              <div>{discount}</div>
              <img
                src={Icons.cross}
                style={{ height: '16px', marginLeft: '10px' }}
                alt=''
              />
            </div>
          ) : null}
        </div>
      ) : null}
      <div
        style={{
          fontWeight: 'bold',
          lineHeight: '20px',
          margin: '24px 0 16px',
        }}
      >
        Order items
      </div>
      {checkout.lineItems.edges.map((item) => (
        <div key={item.node.id} className='order-item'>
          <img
            src={item.node.variant.image.url}
            style={{ width: '51px', height: '76px', objectFit: 'contain' }}
            alt=''
          />
          <div className='order-item-right'>
            <div style={{ fontWeight: 'bold' }}>
              {item.node.variant.product.productType}
            </div>
            <div style={{ flex: '1' }}>{item.node.variant.product.title}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div
                style={{
                  fontSize: '12px',
                  lineHeight: '16px',
                  color: '#757575',
                }}
              >
                {item.node.variant.title} x{item.node.quantity}
              </div>
              <div>
                {item.node.variant.price.currencyCode}
                {item.node.variant.price.amount}
              </div>
            </div>
          </div>
        </div>
      ))}
      <div
        style={{ fontWeight: 'bold', lineHeight: '20px', marginBottom: '16px' }}
      >
        Summary
      </div>
      <div
        style={{
          padding: '12px 0',
          borderTop: '1px solid #eee',
          borderBottom: '1px solid #eee',
        }}
      >
        <div className='summary-item'>
          <div>Subtotal</div>
          <div>
            {checkout.lineItemsSubtotalPrice.currencyCode}
            {checkout.lineItemsSubtotalPrice.amount}
          </div>
        </div>
        <div className='summary-item'>
          <div>Shipping</div>
          {checkout.shippingLine != null ? (
            <div>
              {checkout.shippingLine.priceV2.currencyCode}
              {checkout.shippingLine.priceV2.amount}
            </div>
          ) : (
            <div>CNY 0.0</div>
          )}
        </div>
        <div className='summary-item'>
          <div>Taxes</div>
          <div>
            {checkout.totalTaxV2.currencyCode}
            {checkout.totalTaxV2.amount}
          </div>
        </div>
        <div className='summary-item'>
          <div>Discount</div>
          <div>
            {checkout.totalPriceV2.currencyCode}
            {checkout.shippingLine != null
              ? (
                  checkout.totalPriceV2.amount -
                  checkout.lineItemsSubtotalPrice.amount -
                  checkout.shippingLine.priceV2.amount -
                  checkout.totalTaxV2.amount
                ).toFixed(1)
              : (
                  checkout.totalPriceV2.amount -
                  checkout.lineItemsSubtotalPrice.amount -
                  checkout.totalTaxV2.amount
                ).toFixed(1)}
          </div>
        </div>
      </div>
      <div className='summary-total'>
        <div>Total</div>
        <div>
          {checkout.totalPriceV2.currencyCode}
          {checkout.totalPriceV2.amount}
        </div>
      </div>
    </div>
  )
}

export default CheckoutInfoView
