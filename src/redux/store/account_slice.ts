import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { LoginSchema } from '../../server/graphql/schema/login_schema'
import { apolloClient } from '../../server/graphql'
import { AddresseEdge, Customer } from '../../data/customer/model'

type AccountState = { account: { token: string } }

const queryCustomer = createAsyncThunk(
  'account/queryCustomer',
  async (_, thunk) => {
    const state: AccountState = thunk.getState() as AccountState
    if (state.account.token != null) {
      const result = await apolloClient.query({
        query: LoginSchema.customer,
        variables: {
          customerAccessToken: state.account.token,
        },
      })
      return result.data.customer
    }
    return false
  }
)

const initialState: {
  token: string | null
  customer: Customer | null
  loading: boolean
  tempAddress: AddresseEdge | null
  showAddressDetail: boolean
} = {
  token: (() => {
    const localToken = localStorage.getItem('KPublicToken')
    if (localToken == null) {
      return null
    } else {
      return localToken
    }
  })(),
  customer: null,
  loading: false,
  tempAddress: null,
  showAddressDetail: false,
}

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setToken: (state, action) => {
      const token = action.payload
      if (token != null) {
        state.token = token
        localStorage.setItem('KPublicToken', token)
      } else {
        localStorage.removeItem('KPublicToken')
      }
    },
    setCustomer: (state, action) => {
      state.customer = action.payload
    },
    setShowAddressDetail: (state, action) => {
      const params = action.payload
      state.showAddressDetail = params.show
      state.tempAddress = params.address
    },
  },
  extraReducers: (builder) => {
    builder.addCase(queryCustomer.pending, (state) => {
      state.loading = true
    })
    builder.addCase(queryCustomer.fulfilled, (state, action) => {
      if (action.payload !== false) {
        state.customer = action.payload
      }
      state.loading = false
    })
    builder.addCase(queryCustomer.rejected, (state) => {
      state.loading = false
    })
  },
})

export const { setToken, setCustomer, setShowAddressDetail } =
  accountSlice.actions

export default accountSlice.reducer

export { queryCustomer }
