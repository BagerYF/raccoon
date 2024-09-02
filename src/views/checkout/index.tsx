import { useEffect, useState } from 'react'
import './index.css'
import { apolloClient } from '../../server/graphql'
import { CheckoutSchemas } from '../../server/graphql/schema/checkout_schema'
import CheckoutAddressView from '../../components/checkout_address_view'
import { queryCustomer } from '../../redux/store/account_slice'
import { useSelector } from 'react-redux'
import CheckoutInfoView from '../../components/checkout_info_view'
import CheckoutDeliveryView from '../../components/checkout_delivery_view'
import CheckboxPaymentView from '../../components/checkout_payment_view'
import CheckoutCompleteView from '../../components/checkout_complete_view'
import { message } from 'antd'
import LoadingView from '../../components/loading_view/index'
import { RootState, useAppDispatch } from '../../redux'
import { Cart } from '../../data/cart/model'
import { AddressObject } from '../../data/region'
import { Checkout, ShippingRate } from '../../data/checkout/model'

function CheckoutView() {
  const dispatch = useAppDispatch()

  const [checkout, setCheckout] = useState<Checkout | null>(null)
  const [tabIndex, setTabIndex] = useState(-1)
  const [address, setAddress] = useState<AddressObject | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()
  const token = useSelector((state: RootState) => state.account.token)

  useEffect(() => {
    dispatch(queryCustomer())
    initCheckout()
  }, [])

  async function initCheckout() {
    const localCart: string = localStorage.getItem('KPublicCart') as string
    const cart: Cart = JSON.parse(localCart) as Cart
    const params = {
      lineItems: cart.lines.edges?.map((e) => {
        return {
          variantId: e.node.merchandise.id,
          quantity: e.node.quantity,
        }
      }),
    }
    const result = await apolloClient.mutate({
      mutation: CheckoutSchemas.checkoutCreate,
      variables: {
        input: params,
      },
    })
    setCheckout(result.data.checkoutCreate.checkout)
    setTabIndex(0)
  }

  const addressNext = async (data: AddressObject) => {
    setIsLoading(true)
    await checkoutShippingAddressUpdate(data)
    const result = await checkoutShippingLines()
    if (result) {
      setTabIndex(1)
    }
    setIsLoading(false)
  }

  const changeTabIndex = (index: number) => {
    setTabIndex(index)
  }

  const deliveryNext = () => {
    if (checkout && checkout.shippingLine == null) {
      messageApi.open({
        type: 'warning',
        content: 'Please select a shipping method',
      })
    } else {
      setTabIndex(2)
    }
  }

  const placeOrder = async () => {
    setIsLoading(true)
    const results = await apolloClient.mutate({
      mutation: CheckoutSchemas.checkoutCustomerAssociateV2,
      variables: {
        checkoutId: checkout?.id,
        customerAccessToken: token,
      },
    })
    setCheckout(results.data.checkoutCustomerAssociateV2.checkout)
    const result = await apolloClient.mutate({
      mutation: CheckoutSchemas.checkoutCompleteFree,
      variables: {
        checkoutId: checkout?.id,
      },
    })
    setCheckout(result.data.checkoutCompleteFree.checkout)
    setTabIndex(3)
    setIsLoading(false)
  }

  const checkoutShippingAddressUpdate = async (data: AddressObject) => {
    setAddress(data)
    const result = await apolloClient.mutate({
      mutation: CheckoutSchemas.checkoutShippingAddressUpdate,
      variables: {
        checkoutId: checkout?.id,
        shippingAddress: data,
      },
    })
    setCheckout(result.data.checkoutShippingAddressUpdateV2.checkout)
  }

  const checkoutShippingLines = async () => {
    const result = await apolloClient.mutate({
      mutation: CheckoutSchemas.checkoutShippingLines,
      variables: {
        id: checkout?.id,
      },
    })
    const tempCheckout: Checkout = checkout!
    tempCheckout.availableShippingRates =
      result.data.node.availableShippingRates
    setCheckout(tempCheckout)
    if (
      tempCheckout.availableShippingRates &&
      tempCheckout.availableShippingRates.ready === true
    ) {
      return true
    }
    return await checkoutShippingLines()
  }

  const checkoutShippingLineUpdate = async (item: ShippingRate) => {
    setIsLoading(true)
    const result = await apolloClient.mutate({
      mutation: CheckoutSchemas.checkoutShippingLineUpdate,
      variables: {
        checkoutId: checkout?.id,
        shippingRateHandle: item.handle,
      },
    })
    setCheckout(result.data.checkoutShippingLineUpdate.checkout)
    setIsLoading(false)
  }

  const checkoutDiscountCodeApply = async (code: string) => {
    setIsLoading(true)
    const result = await apolloClient.mutate({
      mutation: CheckoutSchemas.checkoutDiscountCodeApplyV2,
      variables: {
        checkoutId: checkout?.id,
        discountCode: code,
      },
    })
    setIsLoading(false)
    if (result.data.checkoutDiscountCodeApplyV2.checkoutUserErrors.length > 0) {
      return false
    } else {
      setCheckout(result.data.checkoutDiscountCodeApplyV2.checkout)
      return true
    }
  }

  const checkoutDiscountCodeRemove = async () => {
    setIsLoading(true)
    const result = await apolloClient.mutate({
      mutation: CheckoutSchemas.checkoutDiscountCodeRemove,
      variables: {
        checkoutId: checkout?.id,
      },
    })
    setCheckout(result.data.checkoutDiscountCodeRemove.checkout)
    setIsLoading(false)
  }

  return checkout != null ? (
    <div>
      <div className='checkout-view-bgc'>
        {contextHolder}
        <div className='header'>S H O P I F Y</div>
        <div className='content'>
          <div className='content-wrap'>
            <div className='content-left'>
              {tabIndex === 0 ? (
                <CheckoutAddressView addressNext={addressNext} />
              ) : null}
              {tabIndex === 1 ? (
                <CheckoutDeliveryView
                  checkout={checkout}
                  address={address!}
                  checkoutShippingLineUpdate={checkoutShippingLineUpdate}
                  deliveryNext={deliveryNext}
                  changeTabIndex={changeTabIndex}
                />
              ) : null}
              {tabIndex === 2 ? (
                <CheckboxPaymentView
                  checkout={checkout}
                  address={address!}
                  placeOrder={placeOrder}
                  changeTabIndex={changeTabIndex}
                />
              ) : null}
              {tabIndex === 3 ? (
                <CheckoutCompleteView checkout={checkout} address={address!} />
              ) : null}
            </div>
            <div className='content-right'>
              <CheckoutInfoView
                checkout={checkout}
                tabIndex={tabIndex}
                checkoutDiscountCodeApply={checkoutDiscountCodeApply}
                checkoutDiscountCodeRemove={checkoutDiscountCodeRemove}
              />
            </div>
          </div>
        </div>
        <div className='footer'>
          Refund policy &nbsp;&nbsp; Privacy policy &nbsp;&nbsp; Terms of
          service
        </div>
      </div>
      {isLoading ? <LoadingView fullScreen={true} /> : null}
    </div>
  ) : (
    <LoadingView height={'100vh'} />
  )
}

export default CheckoutView
