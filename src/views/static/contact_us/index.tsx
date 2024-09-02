import {
  Collapse,
  Form,
  Input,
  Button,
  Radio,
  Space,
  Select,
  CollapseProps,
  RadioChangeEvent,
  FormProps,
} from 'antd'
import React, { useState, useEffect } from 'react'

interface TextInfo {
  type?: string
  title?: string
  text?: string
}

const textList: TextInfo[] = [
  {
    title: 'I want to cancel my order',
    text: `We understand that sometimes customers may need to cancel their order. Please note, if your order has been prepared for shipment, cancellation requests cannot be accepted. If your order has not been prepared for shipment, you can cancel your order as follows:
Login to your account.
Go to the My Orders page by clicking on the account button and selecting "My Orders".
Find the order you want to cancel and click to see the order details.
Click the "Cancel item(s)" button below your order items and follow the prompts to cancel your order.
See our cancellation policy for more information.`,
  },
  {
    title: 'I want to return an item',
    text: `Once you receive your item, you can initiate a return as follows:
Login to your account.
Go to the My Orders page by clicking on the account button and selecting "My Orders".
Find the order you want to return and click to see the order details.
Click the "Return item(s)" button below your order items and follow the prompts to schedule your return.
For more information on eligibility and conditions see our return policy.
`,
  },
]

const typeList: string[] = [
  'Trouble placing an order',
  'Product information',
  'Status of my order',
  'Delivery tracking',
  'Product I received',
  'Returns',
  'Refunds',
  'Change my address',
]

type FieldType = {
  name?: string
  email?: string
  phone?: string
  orderNumber?: string
  type?: string
  message?: string
}

function FormView() {
  const [form] = Form.useForm()
  const [relateOrder, setRelateOrder] = useState('no')
  const { TextArea } = Input

  const onRelateOrderChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value)
    setRelateOrder(e.target.value)
  }

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values)
  }
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo
  ) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div>
      <div style={{ lineHeight: '20px', marginTop: '16px' }}>
        To submit an inquiry, simply complete the contact form below and click
        ‘Send’. We aim to get back to you in one business day.
      </div>
      <div
        style={{
          lineHeight: '20px',
          marginTop: '20px',
          marginBottom: '20px',
          color: '#201313',
        }}
      >
        Currently, we are receiving a high volume of inquiries and will require
        more time than usual to respond. We apologise for the inconvenience.
      </div>
      <Form
        layout='vertical'
        form={form}
        initialValues={{}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item<FieldType>
          label='Name*'
          name='name'
          rules={[
            {
              required: true,
              message: 'Please input name',
            },
          ]}
        >
          <Input
            style={{ height: '40px', borderRadius: '2px', fontSize: '14px' }}
            placeholder='Name'
          />
        </Form.Item>
        <Form.Item<FieldType>
          label='Email*'
          name='email'
          rules={[
            {
              required: true,
              message: 'Please input email',
            },
          ]}
        >
          <Input
            style={{ height: '40px', borderRadius: '2px', fontSize: '14px' }}
            placeholder='Email address'
          />
        </Form.Item>
        <Form.Item<FieldType>
          label='Phone*'
          name='phone'
          rules={[
            {
              required: true,
              message: 'Please input phone number',
            },
          ]}
        >
          <Input
            style={{ height: '40px', borderRadius: '2px', fontSize: '14px' }}
            placeholder='Phone number'
          />
        </Form.Item>
        <Form.Item label='Is this enquiry related to an existing order?*'>
          <Radio.Group value={relateOrder} onChange={onRelateOrderChange}>
            <Space direction='vertical'>
              <Radio value={'yes'}>Yes</Radio>
              <Radio value={'no'}>No</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>
        {relateOrder === 'yes' ? (
          <Form.Item<FieldType>
            label='Order Number*'
            name='orderNumber'
            rules={[
              {
                required: true,
                message: 'Please input order number',
              },
            ]}
          >
            <Input
              style={{ height: '40px', borderRadius: '2px', fontSize: '14px' }}
              placeholder='Order number'
            />
          </Form.Item>
        ) : null}
        <Form.Item<FieldType>
          label='Inquiry type*'
          name='type'
          rules={[
            {
              required: true,
              message: 'Please select inquiry type',
            },
          ]}
        >
          <Select
            placeholder='Inquiry type'
            style={{
              height: '40px',
              borderRadius: '2px',
              fontSize: '14px',
            }}
          >
            {typeList.map((e) => (
              <Select.Option key={e} value={e}>
                {e}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item<FieldType>
          label='Message'
          name='message'
          rules={[
            {
              required: true,
              message: 'Please input your message',
            },
          ]}
        >
          <TextArea rows={4} placeholder='Type your message here' />
        </Form.Item>
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            style={{ marginTop: '40px' }}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

function ContactUsView() {
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
    tempList.push({
      key: 2,
      label: 'Email customer service',
      children: <FormView />,
    })
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
      <div style={{ width: '700px', marginBottom: '80px' }}>
        <div style={{ fontSize: '30px', margin: '22px 0' }}>
          Help and Contact
        </div>
        <Collapse
          items={items}
          defaultActiveKey={[2]}
          expandIconPosition='end'
          bordered={false}
          style={{ backgroundColor: '#fcfcfc' }}
        />
      </div>
    </div>
  )
}

export default ContactUsView
