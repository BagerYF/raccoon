import './index.css'
import { useSelector } from 'react-redux'
import Icons from '../../assets/icons'
import LoadingView from '../../components/loading_view'
import { setShowAddressDetail } from '../../redux/store/account_slice'
import { AddressSchema } from '../../server/graphql/schema/address_schema'
import { apolloClient } from '../../server/graphql'
import { queryCustomer } from '../../redux/store/account_slice'
import { RootState } from '../../redux'
import { useAppDispatch } from '../../redux/index'
import { AddresseEdge } from '../../data/customer/model'
import AddressDetailView from '../../components/address_detail_view'

function AddressView() {
  const dispatch = useAppDispatch()
  const customer = useSelector((state: RootState) => state.account.customer)
  const loading = useSelector((state: RootState) => state.account.loading)
  const showAddressDetail = useSelector(
    (state: RootState) => state.account.showAddressDetail
  )
  const token = useSelector((state: RootState) => state.account.token)

  async function removeAddress(address: AddresseEdge) {
    await apolloClient.mutate({
      mutation: AddressSchema.customerAddressDelete,
      variables: {
        customerAccessToken: token,
        id: address.node.id,
      },
    })

    dispatch(setShowAddressDetail({ show: false }))
    dispatch(queryCustomer())
  }

  return (
    <div className='address-bgc'>
      {customer != null ? (
        <div className='bgw'>
          <div
            style={{
              fontSize: '18px',
              lineHeight: '26px',
              fontWeight: 'bold',
              marginBottom: '32px',
            }}
          >
            Address Book
          </div>
          {customer.addresses.edges.length === 0 ? (
            <div style={{ lineHeight: '20px' }}>
              You do not have any saved addresses
            </div>
          ) : null}
          <div
            style={{
              lineHeight: '20px',
              fontWeight: 'bold',
              marginBottom: '12px',
            }}
          >
            Your Saved Addresses
          </div>
          {[...customer.addresses.edges].reverse().map((item) => (
            <div
              key={item.node.id}
              style={{
                borderTop: '1px solid #eee',
                display: 'flex',
                alignItems: 'end',
                padding: '12px 0',
              }}
            >
              <div style={{ flex: '1' }}>
                <div style={{ lineHeight: '20px', fontWeight: 'bold' }}>
                  {item.node.name}
                </div>
                <div style={{ lineHeight: '20px' }}>
                  {item.node.address1}
                  {item.node.address2}
                  <br />
                  {item.node.city}
                  {item.node.province}
                  {item.node.country}
                  {item.node.zip}
                  <br />
                  {item.node.phone}
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  lineHeight: '20px',
                  color: '#757575',
                }}
              >
                <div
                  style={{ marginRight: '24px' }}
                  onClick={() => {
                    dispatch(
                      setShowAddressDetail({ show: true, address: item })
                    )
                  }}
                >
                  Edit
                </div>
                <div
                  onClick={() => {
                    removeAddress(item)
                  }}
                >
                  Remove
                </div>
              </div>
            </div>
          ))}
          <div
            className='address-add-btn'
            onClick={() => {
              dispatch(setShowAddressDetail({ show: true }))
            }}
          >
            <img
              src={Icons.plus}
              style={{ width: '14px', height: '14px' }}
              alt=''
            />
            <div>Add address</div>
          </div>
          {showAddressDetail ? <AddressDetailView /> : null}
        </div>
      ) : loading ? (
        <LoadingView height={'400px'} />
      ) : null}
    </div>
  )
}

export default AddressView
