import './index.css'
import { Checkbox, Col, Input, Row } from 'antd'
import Icons from '../../assets/icons'

function SubscribeView() {
  const onChange = (checkedValues: string[]) => {
    console.log('checked = ', checkedValues)
  }

  return (
    <div className='subscribe-view-bgs'>
      <div className='subscribe-view-line'></div>
      <div className='subscribe-view-content'>
        <div className='subscribe-view-content-left'>
          <div style={{ fontSize: '18px', lineHeight: '25px' }}>
            Stay ahead of the trend
          </div>
          <div
            style={{ fontSize: '16px', lineHeight: '22px', color: '#505050' }}
          >
            Be the first to know about sales and the latest arrivals from our
            <br />
            extensive range of iconic designer brands.
          </div>
        </div>
        <div className='subscribe-view-content-right'>
          <div
            style={{
              fontSize: '16px',
              lineHeight: '22px',
              color: '#757575',
              marginBottom: '16px',
            }}
          >
            Your department preference
          </div>
          <div>
            <Checkbox.Group onChange={onChange}>
              <Row>
                <Col span={24} className='subscribe-view-e-checkbox'>
                  <Checkbox value='Womenswear'>Womenswear</Checkbox>
                </Col>
                <Col span={24} className='subscribe-view-e-checkbox'>
                  <Checkbox value='Menswear'>Menswear</Checkbox>
                </Col>
                <Col span={24} className='subscribe-view-e-checkbox'>
                  <Checkbox value='Kidswear'>Kidswear</Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </div>

          <Input
            placeholder='Your email address'
            style={{
              width: '406px',
              height: '40px',
              fontSize: '16px',
              marginTop: '16px',
            }}
            prefix={
              <img
                src={Icons.search}
                style={{ width: '14px', marginRight: '8px' }}
                alt=''
              />
            }
          />

          <div className='subscribe-view-btn'>Sign up</div>
          <div style={{ color: '#757575' }}>
            <span>
              By signing up you agree with our &nbsp;
              <span style={{ textDecoration: 'underline' }}>
                Terms & Conditions
              </span>
              &nbsp; and &nbsp;
              <span style={{ textDecoration: 'underline' }}>
                Privacy Policy
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubscribeView
