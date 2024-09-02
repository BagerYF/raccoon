import React, { useState } from 'react'
import './index.css'
import { useDispatch, useSelector } from 'react-redux'
import Icons from '../../assets/icons'
import { apolloClient } from '../../server/graphql'
import { setCart } from '../../redux/store/cart_slice'
import { CartSchema } from '../../server/graphql/schema/cart_schema'
import BenefitView from '../../components/benefit_view'
import RecommendedView from '../../components/recommended_view'
import SubscribeView from '../../components/subscribe_view'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../redux'
import { Edge } from '../../data/cart/model'

function CartView() {
  const cart = useSelector((state: RootState) => state.cart.cart)
  const dispatch = useDispatch()
  const [showQtyIndex, setShowQtyIndex] = useState(-1)
  const [showQtySelectIndex, setShowQtySelectIndex] = useState(-1)
  const navigate = useNavigate()

  function showSelectQty(index: number) {
    if (showQtySelectIndex === index) {
      setShowQtySelectIndex(-1)
    } else {
      setShowQtySelectIndex(index)
    }
  }

  function selectQty(item: Edge, qty: number) {
    if (item.node.quantity !== qty) {
      updateProductQuantityInCart(item.node.id, qty)
    }
    hideQty()
  }

  function hideQty() {
    setShowQtyIndex(-1)
    setShowQtySelectIndex(-1)
  }

  async function updateProductQuantityInCart(cartItemId: string, qty: number) {
    const result = await apolloClient.mutate({
      mutation: CartSchema.updateProductQuantityInCart,
      variables: {
        cartId: cart?.id,
        lines: [
          {
            quantity: qty,
            id: cartItemId,
          },
        ],
      },
    })

    dispatch(setCart(result.data.cartLinesUpdate.cart))
  }

  async function removeProductFromCart(cartItemId: string) {
    const result = await apolloClient.mutate({
      mutation: CartSchema.removeProductFromCart,
      variables: {
        cartId: cart?.id,
        lineIds: [cartItemId],
      },
    })

    dispatch(setCart(result.data.cartLinesRemove.cart))
  }

  function goToCheckout() {
    navigate('/checkout')
  }

  return (
    <>
      <div className='bgcc'>
        {cart != null ? (
          <div style={{ display: 'flex' }}>
            <div className='content-left'>
              {cart.lines.edges.map((item, index) => (
                <div className='content-left-item' key={item.node.id}>
                  <div style={{ width: '104px', height: '160px' }}>
                    <img
                      src={item.node.merchandise.image.url}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                      }}
                      alt=''
                    />
                  </div>
                  <div
                    style={{
                      margin: '0 24px',
                      flex: '1',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div className='title'>
                      {item.node.merchandise.product.vendor}
                    </div>
                    <div style={{ flex: '1', lineHeight: '20px' }}>
                      {item.node.merchandise.product.title}
                    </div>
                    <div className='title'>
                      {item.node.merchandise.price.currencyCode}
                      {item.node.merchandise.price.amount}
                    </div>
                  </div>
                  <div
                    style={{
                      flex: '1',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div style={{ flex: '1' }}>
                      <div className='title'>Size</div>
                      <div style={{ lineHeight: '20px' }}>
                        {item.node.merchandise.title}
                      </div>
                    </div>
                    <div>
                      <div className='title'>Quantity</div>
                      {showQtyIndex !== index ? (
                        <div style={{ display: 'flex' }}>
                          <div>{item.node.quantity}</div>
                          <div
                            style={{
                              fontSize: '12px',
                              lineHeight: '16px',
                              color: '#757575',
                              textDecoration: 'underline',
                              marginLeft: '12px',
                            }}
                            onClick={() => {
                              setShowQtyIndex(index)
                              setShowQtySelectIndex(-1)
                            }}
                          >
                            Change
                          </div>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', marginTop: '8px' }}>
                          <div style={{ position: 'relative' }}>
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '0 8px',
                                width: '95px',
                                height: '30px',
                                backgroundColor: '#eee',
                                alignItems: 'center',
                              }}
                              onClick={() => {
                                showSelectQty(index)
                              }}
                            >
                              <div>{item.node.quantity}</div>
                              <img
                                src={Icons.arrow_down}
                                style={{ height: '20px' }}
                                alt=''
                              />
                            </div>
                            {showQtySelectIndex === index ? (
                              <div
                                style={{ position: 'absolute', top: '30px' }}
                              >
                                {[1, 2, 3, 4, 5].map((sItem) => (
                                  <div
                                    key={sItem}
                                    style={{
                                      padding: '0 8px',
                                      width: '95px',
                                      height: '30px',
                                      lineHeight: '30px',
                                      backgroundColor: '#eee',
                                    }}
                                    onClick={() => {
                                      selectQty(item, sItem)
                                    }}
                                  >
                                    {sItem}
                                  </div>
                                ))}
                              </div>
                            ) : null}
                          </div>
                          <div
                            style={{
                              fontSize: '12px',
                              lineHeight: '30px',
                              color: '#757575',
                              textDecoration: 'underline',
                              marginLeft: '12px',
                            }}
                            onClick={() => {
                              hideQty()
                            }}
                          >
                            Cancle
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    onClick={() => {
                      removeProductFromCart(item.node.id)
                    }}
                  >
                    <img src={Icons.cross} height='24px' alt='' />
                  </div>
                </div>
              ))}
            </div>
            <div style={{ width: '330px' }}>
              <div
                style={{
                  lineHeight: '28px',
                  fontWeight: 'bold',
                  borderBottom: '1px solid #eee',
                }}
              >
                Summary
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  lineHeight: '20px',
                  marginTop: '16px',
                }}
              >
                <div>Subtotal</div>
                <div>
                  {cart.cost.subtotalAmount.currencyCode}
                  {cart.cost.subtotalAmount.amount}
                </div>
              </div>
              <div style={{ fontSize: '12px', marginTop: '16px' }}>
                Shipping & taxes calculated at checkout
              </div>
              <div className='cart-btn' onClick={goToCheckout}>
                Continue to Checkout
              </div>
              <div
                style={{
                  fontWeight: 'bold',
                  marginTop: '30px',
                  lineHeight: '20px',
                }}
              >
                Changes to return policy
              </div>
              <div style={{ lineHeight: '20px' }}>
                Please note, we have updated our return policy
              </div>
              <div
                style={{
                  lineHeight: '20px',
                  color: '#757575',
                  textDecoration: 'underline',
                }}
              >
                See more
              </div>
            </div>
          </div>
        ) : (
          <div className='empty-bg'>
            <div style={{ fontSize: '30px' }}>Shopping Bag</div>
            <div style={{ fontSize: '16px', marginTop: '30px' }}>
              Your shopping bag is currently empty
            </div>
            <div className='shop-btn'>Continue browsing</div>
          </div>
        )}
        <RecommendedView />
        <BenefitView />
        <SubscribeView />
      </div>
      <div></div>
    </>
  )
}

export default CartView
