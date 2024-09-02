import Modal from 'antd/es/modal/Modal'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { setShowAddressDetail } from '../../redux/store/account_slice'
import Icons from '../../assets/icons'
import { Button, Col, Form, FormProps, Input, Row, Select } from 'antd'
import kCountryMaps, {
  AddressObject,
  CountryObject,
  Province,
} from '../../data/region'
import { AddressSchema } from '../../server/graphql/schema/address_schema'
import { apolloClient } from '../../server/graphql'
import { queryCustomer } from '../../redux/store/account_slice'
import { RootState, useAppDispatch } from '../../redux'

function AddressDetailView() {
  const dispatch = useAppDispatch()
  const [form] = Form.useForm()
  const showAddressDetail = useSelector(
    (state: RootState) => state.account.showAddressDetail
  )
  const currentRegion = useSelector(
    (state: RootState) => state.menu.currentRegion
  )
  const token = useSelector((state: RootState) => state.account.token)
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
    zip: 'zip',
    phone: '199999',
  })

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
    addressHandle(values)
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

  const handleCancel = () => {
    dispatch(setShowAddressDetail({ show: false }))
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

    let address: AddressObject = {}
    if (tAddress != null) {
      address = {
        firstName: tAddress.node.firstName,
        lastName: tAddress.node.lastName,
        country: tAddress.node.country,
        address1: tAddress.node.address1,
        address2: tAddress.node.address2,
        city: tAddress.node.city,
        province: tAddress.node.province,
        zip: tAddress.node.zip,
        phone: tAddress.node.phone,
      }
    } else {
      address = tempAddress
    }

    if (currencyCountry.provinces.length > 0) {
      setTempAddress({
        ...address,
        province:
          tAddress == null
            ? currencyCountry.provinces[0].name
            : tAddress.node.province,
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

  async function addressHandle(address: AddressObject) {
    if (tAddress != null) {
      await apolloClient.mutate({
        mutation: AddressSchema.customerAddressUpdate,
        variables: {
          customerAccessToken: token,
          id: tAddress.node.id,
          address: address,
        },
      })
    } else {
      await apolloClient.mutate({
        mutation: AddressSchema.customerAddressCreate,
        variables: {
          customerAccessToken: token,
          address: address,
        },
      })
    }
    dispatch(setShowAddressDetail({ show: false }))
    dispatch(queryCustomer())
  }

  return (
    <Modal
      footer={null}
      closable={false}
      open={showAddressDetail}
      width={'500px'}
      onCancel={handleCancel}
    >
      {initDone ? (
        <div
          style={{
            width: '500px',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: '0 16px',
              height: '52px',
            }}
          >
            <div style={{ fontSize: '16px' }}>
              {tAddress != null ? 'Update Address' : 'Add Address'}
            </div>
            <img
              src={Icons.cross}
              style={{ width: '16px' }}
              onClick={handleCancel}
              alt=''
            />
          </div>
          <div style={{ margin: '0 16px' }}>
            <Form
              layout='vertical'
              form={form}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              onValuesChange={onValuesChange}
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
                  justifyContent: 'end',
                  alignItems: 'center',
                  margin: '24px 24px',
                }}
              >
                <div style={{ marginRight: '24px', color: '#757575' }}>
                  Cancel
                </div>
                <Button
                  type='primary'
                  htmlType='submit'
                  style={{ width: '140px' }}
                >
                  {tAddress != null ? 'Update Address' : 'Add Address'}
                </Button>
              </div>
            </Form>
          </div>
        </div>
      ) : null}
    </Modal>
  )
}

export default AddressDetailView
