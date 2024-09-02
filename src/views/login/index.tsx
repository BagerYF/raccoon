import './index.css'
import { Form, Input, Button, FormProps } from 'antd'
import { LoginSchema } from '../../server/graphql/schema/login_schema'
import { apolloClient } from '../../server/graphql'
import { useDispatch } from 'react-redux'
import { setToken, setCustomer } from '../../redux/store/account_slice'
import { useNavigate } from 'react-router-dom'

function LoginView() {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  type FieldType = {
    email?: string
    pwd?: string
  }

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values)
    login()
  }

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo
  ) => {
    console.log('Failed:', errorInfo)
  }

  const login = async () => {
    const result = await apolloClient.mutate({
      mutation: LoginSchema.customerAccessTokenCreate,
      variables: {
        input: {
          email: 'bager1@163.com',
          password: '123321',
        },
      },
    })
    const tokenInfo =
      result.data.customerAccessTokenCreate.customerAccessToken.accessToken

    dispatch(setToken(tokenInfo))

    queryCustomer(tokenInfo)
  }

  const queryCustomer = async (tokenInfo: string) => {
    const result = await apolloClient.query({
      query: LoginSchema.customer,
      variables: {
        customerAccessToken: tokenInfo,
      },
    })

    dispatch(setCustomer(result.data.customer))

    setTimeout(() => {
      navigate('/account')
    }, 300)
  }

  return (
    <div className='login-bgc'>
      <div style={{ width: '380px' }}>
        <div
          style={{ fontSize: '20px', lineHeight: '24px', marginBottom: '20px' }}
        >
          Sign in
        </div>
        <Form
          layout='vertical'
          form={form}
          initialValues={{}}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
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
          style={{
            fontSize: '12px',
            lineHeight: '50px',
            color: '#757575',
            textAlign: 'center',
          }}
        >
          Or
        </div>
        <div
          className='regist-btn'
          onClick={() => {
            navigate('/register')
          }}
        >
          Create Account
        </div>
      </div>
    </div>
  )
}

export default LoginView
