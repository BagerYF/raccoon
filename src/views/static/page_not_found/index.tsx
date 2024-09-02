import './index.css'

function PageNotFoundView() {
  return (
    <div className='empty-bgc'>
      <div style={{ fontSize: '30px' }}>Page Not Found</div>
      <div style={{ fontSize: '16px', marginTop: '30px' }}>
        The page you requested does not exist.
      </div>
      <div className='shop-btn'>Continue shop</div>
    </div>
  )
}

export default PageNotFoundView
