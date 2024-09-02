import React, { useEffect, useState } from 'react'
import { ProductSchemas } from '../../server/graphql/schema/product_schema'
import { apolloClient } from '../../server/graphql'
import { Collapse, CollapseProps, message } from 'antd'
import './index.css'
import Icons from '../../assets/icons'
import SubscribeView from '../../components/subscribe_view'
import BenefitView from '../../components/benefit_view'
import { useDispatch, useSelector } from 'react-redux'
import { addWishlist, removeWishlist } from '../../redux/store/wishlist_slice'
import { setCart } from '../../redux/store/cart_slice'
import { CartSchema } from '../../server/graphql/schema/cart_schema'
import LoadingView from '../../components/loading_view'
import { useSearchParams } from 'react-router-dom'
import { RootState } from '../../redux'
import { Product, VariantEdge } from '../../data/product/model/product_detail'
import RecommendedView from '../../components/recommended_view'

function ProductDetail() {
  const [imgsIndex, setImgsIndex] = useState(0)
  const [product, setProduct] = useState<Product | null>(null)
  const [selectVariant, setSelectVariant] = useState<VariantEdge | null>(null)
  const [activeKey, setActiveKey] = useState<string[]>([])
  const [desItems, setDesItems] = useState<CollapseProps['items']>([])
  const [desActiveKey, setDesActiveKey] = useState<string[]>(['1', '2'])
  const [params] = useSearchParams()
  const dispatch = useDispatch()
  const wishlist = useSelector((state: RootState) => state.wishlist.wishlist)
  const cart = useSelector((state: RootState) => state.cart.cart)
  const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => {
    setProduct(null)
    const productId: string = params.get('productId') as string
    getData(productId)
  }, [params])

  function imgLeftHandle() {
    if (imgsIndex > 0) {
      setImgsIndex(imgsIndex - 1)
    }
  }

  function imgRightHandle() {
    if (product && imgsIndex < product.images.edges.length - 1) {
      setImgsIndex(imgsIndex + 1)
    }
  }

  const getData = async (productId: string) => {
    const result = await apolloClient.query({
      query: ProductSchemas.productDetail,
      variables: {
        id: productId,
      },
    })
    setProduct(result.data.product)
    setSelectVariant(result.data.product.variants.edges[0])
    setDesItems([
      {
        key: '1',
        label: 'Detail',
        children: (
          <div
            style={{ lineHeight: '24px', margin: '2px 0', color: '#505050' }}
          >
            {result.data.product.description}
          </div>
        ),
      },
      {
        key: '2',
        label: 'Shipping and Returns',
        children: (
          <div
            style={{ lineHeight: '24px', margin: '2px 0', color: '#505050' }}
          >
            <div style={{ marginTop: '10px', fontWeight: 'bold' }}>
              Shipping
            </div>
            <div style={{ marginTop: '10px', color: '#505050' }}>
              Shopify ships globally to a large number of countries. For more
              information on delivery, visit our orders & shipping page
              <div
                style={{
                  color: '#757575',
                  marginTop: '4px',
                  textDecoration: 'underline',
                }}
              >
                Orders & Shipping
              </div>
            </div>
            <div style={{ marginTop: '10px', fontWeight: 'bold' }}>Returns</div>
            <div style={{ marginTop: '10px', color: '#505050' }}>
              You can purchase in confidence and s'end' the items back to us if
              they are not right for you. If you would like to initiate a
              return, please go to your account at the top right corner where it
              says your name. Click "Create Return" next to the order your would
              like to return and follow the prompts.
            </div>
            <div
              style={{
                color: '#757575',
                marginTop: '4px',
                textDecoration: 'underline',
              }}
            >
              Return Policy
            </div>
          </div>
        ),
      },
    ])
  }

  function variantHandle(item: VariantEdge) {
    if (item.node.quantityAvailable > 0) {
      setSelectVariant(item)
      setActiveKey([])
    }
  }

  const variantOnChange = (key: string | string[]) => {
    setActiveKey([...key])
  }

  const desOnChange = (key: string | string[]) => {
    setDesActiveKey([...key])
  }

  const addToBagHandle = async () => {
    if (selectVariant == null) {
      messageApi.open({
        type: 'warning',
        content: 'Please select a size',
      })
    } else {
      if (cart != null) {
        const result = await apolloClient.mutate({
          mutation: CartSchema.addProductsToCart,
          variables: {
            cartId: cart.id,
            lines: [
              {
                quantity: 1,
                merchandiseId: selectVariant.node.id,
              },
            ],
          },
        })

        dispatch(setCart(result.data.cartLinesAdd.cart))
      } else {
        const result = await apolloClient.mutate({
          mutation: CartSchema.createCart,
          variables: {
            input: {
              lines: [
                {
                  quantity: 1,
                  merchandiseId: selectVariant.node.id,
                },
              ],
            },
          },
        })

        dispatch(setCart(result.data.cartCreate.cart))
      }

      messageApi.open({
        type: 'success',
        content: 'Already added to bag',
      })
    }
  }

  return (
    <div className='bgc'>
      {contextHolder}
      {product != null ? (
        <>
          <div style={{ display: 'flex', alignItems: 'start' }}>
            <div className='imgs'>
              <div className='imgs-left'>
                {product.images.edges.map((item, index) => (
                  <img
                    key={item.node.url}
                    src={item.node.url}
                    className='imgs-left-item'
                    style={
                      index === imgsIndex
                        ? { opacity: '1', border: '1px solid #212121' }
                        : {}
                    }
                    alt=''
                    onClick={() => {
                      setImgsIndex(index)
                    }}
                  />
                ))}
              </div>
              <div className='imgs-arrow-bg'>
                <img
                  src={Icons.arrow_left}
                  className='imgs-arrow'
                  onClick={imgLeftHandle}
                  alt=''
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flex: '1',
                  height: '100%',
                  padding: '0',
                }}
              >
                <img
                  src={product.images.edges[imgsIndex].node.url}
                  style={{
                    width: '100%',
                    aspectRatio: '1',
                    objectFit: 'contain',
                  }}
                  alt=''
                />
              </div>
              <div className='imgs-arrow-bg'>
                <img
                  src={Icons.arrow_right}
                  className='imgs-arrow'
                  onClick={imgRightHandle}
                  alt=''
                />
              </div>
            </div>
            <div style={{ width: '450px' }}>
              <div className='p-item-title'>{product.vendor}</div>
              <div className='p-item-subtitle'>{product.title}</div>
              {product.variants.edges[0].node.compareAtPrice != null ? (
                <div
                  style={{
                    width: '100%',
                    fontSize: '16px',
                    lineHeight: '22px',
                    marginTop: '16px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '14px',
                      color: '#616161',
                      textDecoration: 'line-through',
                    }}
                  >
                    {product.variants.edges[0].node.compareAtPrice.currencyCode}
                    {product.variants.edges[0].node.compareAtPrice.amount}
                  </span>
                  &nbsp;
                  <span style={{ color: '#cb0000' }}>
                    {product.variants.edges[0].node.price.currencyCode}
                    {product.variants.edges[0].node.price.amount}
                  </span>
                </div>
              ) : (
                <div
                  style={{
                    width: '100%',
                    fontSize: '16px',
                    lineHeight: '22px',
                    marginTop: '10px',
                  }}
                >
                  <span>
                    {product.variants.edges[0].node.price.currencyCode}
                    {product.variants.edges[0].node.price.amount}
                  </span>
                </div>
              )}

              {wishlist.filter((e) => e.id === product.id).length > 0 ? (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'end',
                    alignItems: 'center',
                    marginTop: '32px',
                  }}
                  onClick={() => {
                    dispatch(removeWishlist(product))
                  }}
                >
                  <img
                    src={Icons.heart_fill}
                    style={{ width: '16px', marginRight: '2px' }}
                    alt=''
                  />
                  <div style={{ lineHeight: '20px' }}>Added to Wishlist</div>
                </div>
              ) : (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'end',
                    alignItems: 'center',
                    marginTop: '32px',
                  }}
                  onClick={() => {
                    dispatch(addWishlist(product))
                  }}
                >
                  <img
                    src={Icons.heart}
                    style={{ width: '16px', marginRight: '2px' }}
                    alt=''
                  />
                  <div style={{ lineHeight: '20px' }}>Add to Wishlist</div>
                </div>
              )}

              <div
                style={{
                  minHeight: '48px',
                  border: '1px solid #757575',
                  marginTop: '16px',
                  paddingLeft: '10px',
                }}
              >
                <Collapse
                  activeKey={activeKey}
                  onChange={variantOnChange}
                  items={[
                    {
                      key: 'size',
                      label:
                        selectVariant !== null
                          ? selectVariant.node.title
                          : 'Select a size',
                      children: (
                        <>
                          <div
                            style={{
                              backgroundColor: '#f8f8f8',
                              height: '1px',
                              marginBottom: '10px',
                            }}
                          ></div>
                          {product.variants.edges.map((item) => (
                            <div
                              key={item.node.id}
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                fontSize: '16px',
                                lineHeight: '36px',
                              }}
                              onClick={() => variantHandle(item)}
                            >
                              <div
                                style={
                                  item.node.quantityAvailable < 1
                                    ? { color: '#909090' }
                                    : {}
                                }
                              >
                                {item.node.title}
                              </div>
                              {item.node.quantityAvailable < 1 ? (
                                <div
                                  style={{
                                    color: '#909090',
                                    marginRight: '10px',
                                  }}
                                >
                                  Sold out
                                </div>
                              ) : null}
                            </div>
                          ))}
                        </>
                      ),
                    },
                  ]}
                  defaultActiveKey={[]}
                  expandIconPosition='end'
                  bordered={false}
                  style={{ backgroundColor: '#fff', fontSize: '16px' }}
                />
              </div>
              <div className='product_btn_center' onClick={addToBagHandle}>
                Add to bag
              </div>
              <Collapse
                activeKey={desActiveKey}
                onChange={desOnChange}
                items={desItems}
                defaultActiveKey={[]}
                expandIconPosition='end'
                bordered={false}
                style={{ backgroundColor: '#fff', fontSize: '14px' }}
              />
            </div>
          </div>
          <RecommendedView />
          <BenefitView />
          <SubscribeView />
        </>
      ) : (
        <LoadingView height={'400px'} />
      )}
    </div>
  )
}

export default ProductDetail
