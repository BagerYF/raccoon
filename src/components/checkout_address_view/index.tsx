import React, { useEffect, useState } from 'react'
import Icons from '../../assets/icons'
import { useSelector } from 'react-redux'
import {
  Checkbox,
  Col,
  Form,
  Input,
  Select,
  Row,
  Button,
  FormProps,
} from 'antd'
import './index.css'
import kCountryMaps, {
  AddressObject,
  CountryObject,
  Province,
} from '../../data/region'
import { RootState } from '../../redux'

function CheckoutAddressView(props: {
  addressNext: (data: AddressObject) => Promise<void>
}) {
  const customer = useSelector((state: RootState) => state.account.customer)
  const [form] = Form.useForm()
  const currentRegion = useSelector(
    (state: RootState) => state.menu.currentRegion
  )
  const tAddress = useSelector((state: RootState) => state.account.tempAddress)
  const [initDone, setInitDone] = useState(false)
  const [countryList, setCountryList] = useState<CountryObject[]>([])
  const [provinceList, setProvinceList] = useState<Province[]>([])
  const [tempAddress, setTempAddress] = useState<AddressObject>({
    firstName: 'first',
    lastName: 'last',
    country: null,
    address1: 'add1',
    address2: 'add2',
    city: 'city',
    province: null,
    zip: '130000',
    phone: '84199999',
  })
  const { addressNext } = props

  type FieldType = {
    firstName?: string
    lastName?: string
    address1?: string
    address2?: string
    city?: string
    zip?: string
    phone?: string
    country?: string
    province?: string
  }

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values)
    addressNext(values)
  }

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo
  ) => {
    console.log('Failed:', errorInfo)
  }

  const onValuesChange = (values: { [key: string]: string }) => {
    if (values.country != null) {
      const currencyCountry = kCountryMaps.filter(
        (e) => e.name === values.country
      )[0]

      if (currencyCountry.provinces.length > 0) {
        setProvinceList(currencyCountry.provinces)
        form.setFieldValue('province', currencyCountry.provinces[0].name)
      } else {
        setProvinceList([])
        form.setFieldValue('province', null)
      }
    }
  }

  useEffect(() => {
    initData()
  }, [])

  function initData() {
    const currencyCountry = kCountryMaps.filter(
      (e) =>
        e.name ===
        (tAddress == null ? currentRegion.name : tAddress.node.country)
    )[0]

    const originalData = [
      currencyCountry,
      ...kCountryMaps.filter((e) => e.code !== currentRegion.code),
    ]

    setCountryList(originalData)

    setProvinceList(currencyCountry.provinces)

    const address = tempAddress

    if (currencyCountry.provinces.length > 0) {
      setTempAddress({
        ...address,
        province: currencyCountry.provinces[0].name,
        country: currencyCountry.name,
      })
    } else {
      setTempAddress({
        ...address,
        country: currencyCountry.name,
      })
    }
    setTimeout(() => {
      setInitDone(true)
    }, 100)
  }

  function getImgUrl(code: string) {
    return `https://d1mp1ehq6zpjr9.cloudfront.net/static/images/flags/${
      code || ''
    }.png`
  }

  return customer != null && initDone ? (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div className='bread-title-active'>Information</div>
        <img
          src={Icons.arrow_right_grey}
          style={{ height: '11px', margin: '0 14px' }}
          alt=''
        />
        <div className='bread-title'>Shipping</div>
        <img
          src={Icons.arrow_right_grey}
          style={{ height: '11px', margin: '0 14px' }}
          alt=''
        />
        <div className='bread-title'>Payment</div>
      </div>
      <div className='checkout-title'>Contact Information</div>
      <div style={{ lineHeight: '20px' }}>{customer.displayName}</div>
      <div style={{ lineHeight: '20px' }}>{customer.email}</div>
      <Checkbox checked value='email' style={{ marginTop: '16px' }}>
        Email me with news and offers
      </Checkbox>
      <div className='checkout-title'>Shipping Address</div>
      <div style={{ width: '500px', paddingBottom: '1px' }}>
        <div>
          <Form
            layout='vertical'
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            onValuesChange={onValuesChange}
            requiredMark={false}
          >
            <Row gutter={10} justify={'space-between'}>
              <Col span={12}>
                <Form.Item
                  label='First Name'
                  name='firstName'
                  initialValue={tempAddress.firstName}
                  rules={[
                    {
                      required: true,
                      message: 'Please input first name',
                    },
                  ]}
                >
                  <Input
                    style={{
                      height: '40px',
                      borderRadius: '2px',
                      fontSize: '14px',
                    }}
                    placeholder='First name'
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label='Last Name'
                  name='lastName'
                  initialValue={tempAddress.lastName}
                  rules={[
                    {
                      required: true,
                      message: 'Please input last name',
                    },
                  ]}
                >
                  <Input
                    style={{
                      height: '40px',
                      borderRadius: '2px',
                      fontSize: '14px',
                    }}
                    placeholder='Last name'
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              label='Country/Region'
              name='country'
              initialValue={tempAddress.country}
              rules={[
                {
                  required: true,
                  message: 'Please select country/region',
                },
              ]}
            >
              <Select
                placeholder='Country/Region'
                style={{
                  height: '40px',
                  borderRadius: '2px',
                  fontSize: '14px',
                }}
              >
                {countryList.map((e) => (
                  <Select.Option key={e.code} value={e.name}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <img
                        src={getImgUrl(e.code)}
                        style={{
                          width: '16px',
                          height: '16px',
                          borderRadius: '8px',
                          marginRight: '8px',
                        }}
                        alt=''
                      />
                      <div>{e.name}</div>
                    </div>
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label='Address'
              name='address1'
              initialValue={tempAddress.address1}
              rules={[
                {
                  required: true,
                  message: 'Please input address',
                },
              ]}
            >
              <Input
                style={{
                  height: '40px',
                  borderRadius: '2px',
                  fontSize: '14px',
                }}
                placeholder='Address'
              />
            </Form.Item>
            <Form.Item
              label='Apartment, suite, unit, etc'
              name='address2'
              initialValue={tempAddress.address2}
              rules={[
                {
                  required: true,
                  message: 'Please input apartment, suite, unit, etc',
                },
              ]}
            >
              <Input
                style={{
                  height: '40px',
                  borderRadius: '2px',
                  fontSize: '14px',
                }}
                placeholder='Apartment, suite, unit, etc'
              />
            </Form.Item>
            <Form.Item
              label='City'
              name='city'
              initialValue={tempAddress.city}
              rules={[
                {
                  required: true,
                  message: 'Please input city',
                },
              ]}
            >
              <Input
                style={{
                  height: '40px',
                  borderRadius: '2px',
                  fontSize: '14px',
                }}
                placeholder='City'
              />
            </Form.Item>
            <Row gutter={10} justify={'space-between'}>
              {provinceList.length > 0 ? (
                <Col span={12}>
                  <Form.Item
                    label='State'
                    name='province'
                    initialValue={tempAddress.province}
                    rules={[
                      {
                        required: true,
                        message: 'Please select state',
                      },
                    ]}
                  >
                    <Select
                      placeholder='State'
                      style={{
                        height: '40px',
                        borderRadius: '2px',
                        fontSize: '14px',
                      }}
                    >
                      {provinceList.map((e) => (
                        <Select.Option key={e.code} value={e.name}>
                          <div>{e.name}</div>
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              ) : null}
              <Col span={provinceList.length > 0 ? 12 : 24}>
                <Form.Item
                  label='Postcode/Zipcode'
                  name='zip'
                  initialValue={tempAddress.zip}
                  rules={[
                    {
                      required: true,
                      message: 'Please input postcode/zipcode',
                    },
                  ]}
                >
                  <Input
                    style={{
                      height: '40px',
                      borderRadius: '2px',
                      fontSize: '14px',
                    }}
                    placeholder='Postcode/Zipcode'
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              label='Phone Number'
              name='phone'
              initialValue={tempAddress.phone}
              rules={[
                {
                  required: true,
                  message: 'Please input phone number',
                },
              ]}
            >
              <Input
                style={{
                  height: '40px',
                  borderRadius: '2px',
                  fontSize: '14px',
                }}
                placeholder='Phone number'
              />
            </Form.Item>
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
              >
                <img src={Icons.arrow_left} style={{ height: '16px' }} alt='' />
                <div style={{ marginLeft: '6px' }}>Return to cart</div>
              </div>
              <Button type='primary' htmlType='submit' className='checkout-btn'>
                Continue to shipping
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  ) : null
}

export default CheckoutAddressView
