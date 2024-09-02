import './index.css'
import { useDispatch, useSelector } from 'react-redux'
import { setToken, setCustomer } from '../../redux/store/account_slice'
import { useNavigate } from 'react-router-dom'
import LoadingView from '../../components/loading_view'
import { RootState } from '../../redux'

function AccountDetailView() {
  const customer = useSelector((state: RootState) => state.account.customer)
  const loading = useSelector((state: RootState) => state.account.loading)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function logout() {
    dispatch(setToken(null))
    dispatch(setCustomer(null))
    navigate('/login')
  }

  return (
    <>
      {customer != null ? (
        <div className='account-detail-bgc'>
          <div
            style={{ fontSize: '18px', lineHeight: '26px', fontWeight: 'bold' }}
          >
            Account Details
          </div>
          <div style={{ border: '1px solid #eee', marginTop: '32px' }}></div>
          <div
            style={{ display: 'flex', marginTop: '12px', lineHeight: '20px' }}
          >
            <div style={{ fontWeight: 'bold', width: '120px' }}>Name</div>
            <div>{customer.displayName}</div>
          </div>
          <div
            style={{ display: 'flex', marginTop: '12px', lineHeight: '20px' }}
          >
            <div style={{ fontWeight: 'bold', width: '120px' }}>Email</div>
            <div>{customer.email}</div>
          </div>
          <div className='sign-out' onClick={logout}>
            <div>Sign out</div>
          </div>
        </div>
      ) : loading ? (
        <LoadingView height={'400px'} />
      ) : null}
    </>
  )
}

export default AccountDetailView
