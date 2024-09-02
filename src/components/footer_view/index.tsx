import './index.css'
import { Link } from 'react-router-dom'
import Icons from '../../assets/icons'
import { useDispatch, useSelector } from 'react-redux'
import { setShowRegion } from '../../redux/store/menu_slice'
import { RootState } from '../../redux'

function FooterView() {
  const dispatch = useDispatch()
  const currentRegion = useSelector(
    (state: RootState) => state.menu.currentRegion
  )

  const regionHandle = () => {
    dispatch(setShowRegion(true))
  }

  return (
    <div className='footer-view-bg'>
      <div className='footer-view-content'>
        <div className='footer-view-download'>
          <div className='footer-view-download-title'>
            Download the Shopify App
          </div>
          <img
            src={Icons.app_download}
            style={{ height: '16px', marginTop: '10px' }}
            alt=''
          />
        </div>
        <div className='footer-view-link'>
          <div className='footer-view-link-content'>
            <div className='footer-view-link-title'>Customer care</div>
            <Link to='/faq' style={{ textDecoration: 'none' }}>
              <div className='footer-view-link-item'>FAQs</div>
            </Link>
            <Link to='/contact-us' style={{ textDecoration: 'none' }}>
              <div className='footer-view-link-item'>Contact us</div>
            </Link>
            <Link to='/order-shipping?num=5' style={{ textDecoration: 'none' }}>
              <div className='footer-view-link-item'>Return policy</div>
            </Link>
            <Link to='/order-shipping?num=6' style={{ textDecoration: 'none' }}>
              <div className='footer-view-link-item'>Refunds</div>
            </Link>
            <Link to='/order-shipping?num=0' style={{ textDecoration: 'none' }}>
              <div className='footer-view-link-item'>Orders & shipping</div>
            </Link>
            <Link to='/order-shipping?num=1' style={{ textDecoration: 'none' }}>
              <div className='footer-view-link-item'>Delivery</div>
            </Link>
          </div>
          <div className='footer-view-link-content'>
            <div className='footer-view-link-title'>About</div>
            <Link to='/about' style={{ textDecoration: 'none' }}>
              <div className='footer-view-link-item'>About SHOPIFY</div>
            </Link>
            <Link to='/privacy-policy' style={{ textDecoration: 'none' }}>
              <div className='footer-view-link-item'>Privacy policy</div>
            </Link>
            <Link to='/terms-conditions' style={{ textDecoration: 'none' }}>
              <div className='footer-view-link-item'>Terms & conditions</div>
            </Link>
          </div>
          <div className='footer-view-link-content'>
            <div className='footer-view-link-title'>Location</div>
            <div className='footer-view-link-item'>Region:</div>
            <div className='footer-view-link-location' onClick={regionHandle}>
              {currentRegion.currencyCode} $
            </div>
          </div>
        </div>
      </div>
      <div className='footer-view-copyright'>
        ©2024 SHOPIFY. All rights reserved
      </div>
    </div>
  )
}

export default FooterView
