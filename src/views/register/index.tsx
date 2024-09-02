import './index.css'
import { Form, Input, Button, FormProps } from 'antd'
import { LoginSchema } from '../../server/graphql/schema/login_schema'
import { apolloClient } from '../../server/graphql'
import { useNavigate } from 'react-router-dom'

function RegisterView() {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  type FieldType = {
    firstName?: string
    lastName?: string
    email?: string
    pwd?: string
  }

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values)
    register()
  }

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo
  ) => {
    console.log('Failed:', errorInfo)
  }

  const register = async () => {
    const result = await apolloClient.mutate({
      mutation: LoginSchema.customerCreate,
      variables: {
        input: {
          email: 'tom1q@163.com',
          password: '123321',
          firstName: 'Tom',
          lastName: 'Li',
          acceptsMarketing: true,
        },
      },
    })

    console.log(result)
  }

  return (
    <div className='register-bgc'>
      <div style={{ width: '380px' }}>
        <div
          style={{ fontSize: '20px', lineHeight: '24px', marginBottom: '20px' }}
        >
          Welcome to Shopify
        </div>
        <Form
          layout='vertical'
          form={form}
          initialValues={{}}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item<FieldType>
            label='First Name'
            name='firstName'
            initialValue={'First Name'}
            rules={[
              {
                required: true,
                message: 'Please input first name',
              },
            ]}
          >
            <Input
              style={{ height: '40px', borderRadius: '2px', fontSize: '14px' }}
              placeholder='First Name'
            />
          </Form.Item>
          <Form.Item<FieldType>
            label='Last Name'
            name='lastName'
            initialValue={'Last Name'}
            rules={[
              {
                required: true,
                message: 'Please input last name',
              },
            ]}
          >
            <Input
              style={{ height: '40px', borderRadius: '2px', fontSize: '14px' }}
              placeholder='Last Name'
            />
          </Form.Item>
          <Form.Item<FieldType>
            label='Email address'
            name='email'
            initialValue={'Email'}
            rules={[
              {
                required: true,
                message: 'Please input email address',
              },
            ]}
          >
            <Input
              style={{ height: '40px', borderRadius: '2px', fontSize: '14px' }}
              placeholder='Email address'
            />
          </Form.Item>
          <Form.Item<FieldType>
            label='Password'
            name='pwd'
            initialValue={'Pwd'}
            rules={[
              {
                required: true,
                message: 'Please input password',
              },
            ]}
          >
            <Input.Password
              style={{ height: '40px', borderRadius: '2px', fontSize: '14px' }}
              placeholder='Password'
            />
          </Form.Item>
          <Button type='primary' htmlType='submit' className='sign-btn'>
            Sign in
          </Button>
        </Form>
        <div
          style={{ marginTop: '24px', fontSize: '12px', lineHeight: '16px' }}
        >
          <span>
            By registering, you agree to the Shopify&nbsp;
            <span style={{ color: '#757575' }}>Terms and Conditions</span>
            &nbsp;and&nbsp;
            <span style={{ color: '#757575' }}>Privacy Policy</span>
          </span>
        </div>
        <div
          style={{
            marginTop: '24px',
            marginBottom: '50px',
            lineHeight: '20px',
          }}
        >
          <span>
            Already have an account?&nbsp;
            <span
              style={{ color: '#757575', textDecoration: 'underline' }}
              onClick={() => {
                navigate('/login')
              }}
            >
              Sign in
            </span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default RegisterView
