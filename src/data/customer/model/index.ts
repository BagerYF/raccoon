export interface AddresseNode {
  id: string
  address1: string
  address2: string
  city: string
  country: string
  countryCodeV2: string
  firstName: string
  lastName: string
  name: string
  phone: null
  province: string
  provinceCode: string
  zip: string
  __typename: string
}

export interface AddresseEdge {
  node: AddresseNode
  __typename: string
}

export interface Addresse {
  edges: AddresseEdge[]
  __typename: string
}

export interface OriginalTotalPrice {
  amount: string
  currencyCode: string
  __typename: string
}

export interface SubtotalPriceV2 {
  amount: string
  currencyCode: string
  __typename: string
}

export interface TotalPriceV2 {
  amount: string
  currencyCode: string
  __typename: string
}

export interface TotalShippingPriceV2 {
  amount: string
  currencyCode: string
  __typename: string
}

export interface TotalTaxV2 {
  amount: string
  currencyCode: string
  __typename: string
}

export interface CurrentSubtotalPrice {
  amount: string
  currencyCode: string
  __typename: string
}

export interface CurrentTotalPrice {
  amount: string
  currencyCode: string
  __typename: string
}

export interface CurrentTotalTax {
  amount: string
  currencyCode: string
  __typename: string
}

export interface ShippingAddres {
  id: string
  address1: string
  address2: string
  city: string
  country: string
  countryCodeV2: string
  firstName: string
  lastName: string
  name: string
  phone: string
  province: string
  provinceCode: string
  zip: string
  __typename: string
}

export interface Image {
  url: string
  __typename: string
}

export interface Price {
  amount: string
  currencyCode: string
  __typename: string
}

export interface SelectedOption {
  name: string
  value: string
  __typename: string
}

export interface Product {
  productType: string
  __typename: string
}

export interface Variant {
  image: Image
  title: string
  price: Price
  selectedOptions: SelectedOption[]
  product: Product
  __typename: string
}

export interface OriginalTotalPrice {
  amount: string
  currencyCode: string
  __typename: string
}

export interface LineItemNode {
  variant: Variant
  title: string
  quantity: number
  originalTotalPrice: OriginalTotalPrice
  __typename: string
}

export interface LineItemEdge {
  node: LineItemNode
  __typename: string
}

export interface LineItem {
  edges: LineItemEdge[]
  __typename: string
}

export interface OrderNode {
  id: string
  orderNumber: number
  processedAt: string
  email: string
  name: string
  phone: null
  originalTotalPrice: OriginalTotalPrice
  subtotalPriceV2: SubtotalPriceV2
  totalPriceV2: TotalPriceV2
  totalShippingPriceV2: TotalShippingPriceV2
  totalTaxV2: TotalTaxV2
  currentSubtotalPrice: CurrentSubtotalPrice
  currentTotalPrice: CurrentTotalPrice
  currentTotalTax: CurrentTotalTax
  shippingAddress: ShippingAddres
  lineItems: LineItem
  __typename: string
}

export interface OrderEdge {
  node: OrderNode
  __typename: string
}

export interface Order {
  edges: OrderEdge[]
  __typename: string
}

export interface Customer {
  id: string
  acceptsMarketing: boolean
  displayName: string
  email: string
  firstName: string
  lastName: string
  phone: null
  addresses: Addresse
  orders: Order
  __typename: string
}

export interface RootObject {
  customer: Customer
}
