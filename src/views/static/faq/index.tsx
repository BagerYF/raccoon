import { Collapse, CollapseProps } from 'antd'
import React, { useState, useEffect } from 'react'

const textList = [
  {
    title: 'How do I place an order?',
    text: `1. Select a category (Women, Men, Sale) to explore.
2. Once you have done so, choose your size under the dropdown menu of an item and click “Add to Cart”. You will see a number appear next to the shopping bag icon indicating the number of items you have in your cart.
3. When you are ready to check out, click on the bag icon and you will be taken to a page with a summary of the items you wish to purchase. 
4. Click on “Proceed to checkout”
5. Enter your details and address and click “Pay now”.`,
  },
  {
    title: 'Do I need an account to place an order?',
    text: 'No, you may place an order as a guest. However, we highly recommend that you sign up for an account so you can track and review purchases from your account. You can also save your address and personal details which will allow for a smoother shopping experience next time.',
  },
  {
    title: 'I’ve forgotten my password - what should I do?',
    text: 'On the Log In page, click on the “Forgot password” link and we will email you instructions to reset your password.',
  },
  {
    title: 'What payment methods does Shopify accept?',
    text: 'Shopify accepts Visa, Mastercard, American Express and Afterpay.',
  },
  {
    title: 'Afterpay',
    text: `Afterpay is a deferred payment service that allows you to shop today and pay in four payments every 2 weeks without interest. The first payment is taken when you place an order and the three remaining payments will be automatically taken from your chosen credit or debit card every 2 weeks. You can also log into your Afterpay account to view all payments due and make payments in advance. There is a limit of USD $2000 per order made with Afterpay. For more information, please click here for Afterpay's Terms and Conditions.`,
  },
  {
    title: 'Klarna (US and AU only)',
    text: 'Klarna offers a flexible way to pay for the things you want. With Klarna, you pay in four interest-free instalments. Each payment is collected from your chosen credit or debit card. The first instalment is paid when you place your order, the subsequent three instalments are paid each fortnight. You can log in to the Klarna app to view your payment schedule or make payments in advance. For more information, see the Klarna Terms and Conditions.',
  },
  {
    title: 'Which countries doesShopify ship to?',
    text: 'Currently, we ship within Australia, United States of America, Canada, Japan, New Zealand, Singapore, South Korea, Hong Kong, China, Indonesia, Philippines, Macau, Taiwan, Thailand, Saudi Arabia, United Arab Emirates, Qatar, Mexico, Argentina, Colombia, Peru and countries within the European Union We are growing rapidly and will add other countries soon. Please subscribe to our newsletter if you would like to receive updates.',
  },
  {
    title: 'How long does delivery take and how can I track my item?',
    text: 'Delivery within Australia takes 3-7 business days. For information on how to track your purchase, please see our Orders and Shipping page.',
  },
  {
    title: 'How much does shipping cost?',
    text: 'Shipping on orders over USD 250 is free. A nominal shipping fee is charged for orders under USD 250.',
  },
  {
    title: 'Is my package insured?',
    text: 'Yes we insure every package while in transit to our customers.',
  },
  {
    title: 'How do I return an item?',
    text: 'Go to your account at the top right corner where it says your name. Click "Create Return" next to the order you would like to return and follow the prompts. If you encounter any problems, please contact our customer service at customerservice@Shopify.com If you checked out as a guest, please sign up for an account with the same email address you used to make the order and initiate a return from there.',
  },
  {
    title: 'How long does it take to process my refund?',
    text: 'Please note that refunds may take up to 10 working days to process due to varying processing times between payment providers. To ensure your refund is as quick as possible, please see our Returns Policy',
  },
  {
    title: 'Are Shopify products new or pre-owned?',
    text: 'We only sell new items.',
  },
  {
    title: 'Are Shopify products authentic?',
    text: 'All products are guaranteed to be authentic.',
  },
  {
    title: 'How do I subscribe to your newsletter?',
    text: 'In the footer of the homepage, there is a text box under “Sign up for our newsletter” where you can enter your email address. You will then receive an email notifying you that you are subscribed. Our subscribers are the first to receive sale alerts, new arrivals and discount codes.',
  },
  {
    title: `I can't find an item that I am looking for?`,
    text: 'Please email our customer care at customerservice@Shopify.com and we will do our best to help.',
  },
]

function FAQView() {
  const [items, setItems] = useState<CollapseProps['items']>([])

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
        <div style={{ fontSize: '30px', margin: '22px 0' }}>FAQs</div>
        <Collapse
          items={items}
          defaultActiveKey={[]}
          expandIconPosition='end'
          bordered={false}
          style={{ backgroundColor: '#fcfcfc' }}
        />
      </div>
    </div>
  )
}

export default FAQView
