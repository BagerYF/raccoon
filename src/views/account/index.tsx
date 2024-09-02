import { NavLink, Outlet } from 'react-router-dom'
import './index.css'

function AccountView() {
  return (
    <div className='bg'>
      <div style={{ lineHeight: '100px', color: '#757575' }}>
        Back to Shopping
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '220px', height: '200px' }}>
          <div
            style={{
              lineHeight: '20px',
              margin: '4px 0 33px',
            }}
          >
            Account Settings
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <NavLink
              to='/account/account-detail'
              className={({ isActive }) => (isActive ? 'menu-active' : 'menu')}
            >
              Account Details
            </NavLink>
            <NavLink
              to='/account/order'
              className={({ isActive }) => (isActive ? 'menu-active' : 'menu')}
            >
              My Orders
            </NavLink>
            <NavLink
              to='/account/address'
              className={({ isActive }) => (isActive ? 'menu-active' : 'menu')}
            >
              Address Book
            </NavLink>
          </div>
        </div>
        <div style={{ flex: '1' }}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AccountView
