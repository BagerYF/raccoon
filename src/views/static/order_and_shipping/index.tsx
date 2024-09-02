import React, { useState, useEffect } from 'react'
import { CollapseProps, Collapse } from 'antd'
import { useSearchParams } from 'react-router-dom'

const textList = [
  {
    title: 'Order Currency',
    text: 'All orders will be processed in CNY.',
  },
  {
    title: 'Delivery',
    text: `Orders are expected to reach customers 3–10 business days after confirmation.

Please note, shipping times are based on the time from collection and are intended to be indicative only. CETTIRE cannot bear responsibility for circumstances beyond its control such as delays in clearing customs, payment approval and other such matters.

If you refuse a shipment from CETTIRE or do not take the necessary steps to retrieve your shipment after we have attempted delivery at your nominated shipping address you are responsible for the original shipping charges, any import fees that are incurred on the package, and the cost of returning the package to CETTIRE. This amount will be deducted from your merchandise refund.`,
  },
  {
    title: 'Shipping Methods',
    text: 'Orders are shipped via our preferred express couriers DHL and Fedex.',
  },
  {
    title: 'Order Tracking',
    text: 'After placing an order, you will receive an email acknowledgment or push notification, subject to how you register your account. If you register using email, you will receive an email acknowledgment. If you register using a phone number and opt-in to receive notifications, you will receive a push notification. Following that, you will receive another email or push notification with the tracking number associated with your parcel. If you are registered with us, you can check the status by signing in and selecting your order on the My Orders page. Alternatively, you can insert the tracking number supplied into the DHL or Fedex website. You will also receive regular email or push notification updates on the delivery status of your order. Please note that you have 30 days upon the dispatch of your order to contact us should you not receive it. If you contact us after this 30-day period, we cannot guarantee your refund.',
  },
  {
    title: 'Cancellation',
    text: `We understand that sometimes customers may need to cancel their orders. Orders are eligible for cancellation within 24 hours of placement. If the order has been prepared for shipment cancellation requests will not be accepted.

After 24 hours of placing an order, a cancellation fee of 250 CNY applies.

Once your cancellation is confirmed, we will refund to your original payment method. You will receive a confirmation email once payment is complete. Refunds are generally processed within 10 working days, it is important to note that some banks may take longer to process refunds, and CETTIRE has no control over this process.

How to cancel your order
Should you wish to cancel your item, here's what to do:
Login to your account.
Go to the My Orders page by clicking on the account button and selecting "My Orders".
Find the order you want to cancel and click to see the order details.
Click the "Cancel item(s)" button below your order items and follow the prompts to cancel your order.`,
  },
  {
    title: 'Returns',
    text: `You can purchase in confidence and send the items back to us if they are not right for you.


How to return your order:

Login to your account.
Go to the My Orders page by clicking on the account button and selecting "My Orders".
Find the order you want to return and click to see the order details.
Click the "Return item(s)" button below your order items and follow the prompts to schedule your return.
Returns will incur a fee of CNY 250 per item. Shipping fees will not be refunded.


Returns must arrive at our location within 14 days from the date the parcel is received using the label provided by us. Items received after this period are accepted only at the discretion of CETTIRE.


These terms do not apply where your purchase is faulty.`,
  },
  {
    title: 'Return policy',
    text: `All returned items must be new, unused and with all original designer garment tags attached.
Shoes must be returned in their original boxes.
Lingerie and Hosiery must be returned in its unopened packages.
Skincare and cosmetics must be unopened with an unbroken seal and in its original packaging.
Products marked as final sale cannot be returned or exchanged.
If you have any further questions, please contact our customer care team at customerservice_cn@cettire.com`,
  },
  {
    title: 'Refunds',
    text: 'Once we receive the item, we will refund you to your original payment method. Please note that refunds may take up to 10 working days to process due to varying processing times between payment providers.',
  },
  {
    title: 'Exchange',
    text: 'We do not currently offer exchanges. If you would like to exchange an item you will need to return the original item, receive a refund and then place a new order.',
  },
  {
    title: 'Import fee, duties and taxes',
    text: 'Import fees, duties and taxes are included in your order and you will not be required to make any additional payments to the courier upon importation.',
  },
]

function OrderShippingView() {
  const [items, setItems] = useState<CollapseProps['items']>([])
  const [searchParams] = useSearchParams()
  const [num, setNum] = useState<number | string>(searchParams.get('num') ?? 0)

  useEffect(() => {
    const tempList: CollapseProps['items'] = []
    for (let index = 0; index < textList.length; index++) {
      const element = textList[index]
      tempList.push({
        key: index,
        label: element.title,
        children: <p>{element.text}</p>,
      })
    }
    setItems(tempList)
  }, [])

  useEffect(() => {
    setNum(searchParams.get('num') ?? 0)
  }, [searchParams])

  useEffect(() => {
    if (num === 0) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }, [num])

  const onChange = (v: string | string[]) => {
    if (v.length > 0) {
      setNum(parseInt(v[0]) ?? 0)
    } else {
      setNum('')
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div style={{ width: '1024px', marginBottom: '80px' }}>
        <div style={{ fontSize: '30px', margin: '22px 0' }}>
          ORDERS & SHIPPING
        </div>
        <Collapse
          items={items}
          accordion
          activeKey={[num]}
          onChange={onChange}
          expandIconPosition='end'
          bordered={false}
          style={{ backgroundColor: '#fcfcfc' }}
        />
      </div>
    </div>
  )
}

export default OrderShippingView
