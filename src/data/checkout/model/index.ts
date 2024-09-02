export interface PriceV2 {
  amount: number
  currencyCode: string
  __typename: string
}

export interface ShippingRate {
  handle: string
  priceV2: PriceV2
  title: string
  __typename: string
}

export interface AvailableShippingRate {
  ready: boolean
  shippingRates: ShippingRate[]
  __typename: string
}

export interface Image {
  url: string
  __typename: string
}

export interface Price {
  amount: number
  currencyCode: string
  __typename: string
}

export interface Product {
  title: string
  productType: string
  vendor: string
  __typename: string
}

export interface Variant {
  image: Image
  title: string
  price: Price
  product: Product
  __typename: string
}

export interface Node {
  id: string
  title: string
  quantity: number
  variant: Variant
  __typename: string
}

export interface Edge {
  node: Node
  __typename: string
}

export interface LineItem {
  edges: Edge[]
  __typename: string
}

export interface PaymentDueV2 {
  amount: number
  currencyCode: string
  __typename: string
}

export interface SubtotalPriceV2 {
  amount: number
  currencyCode: string
  __typename: string
}

export interface TotalPriceV2 {
  amount: number
  currencyCode: string
  __typename: string
}

export interface TotalTaxV2 {
  amount: number
  currencyCode: string
  __typename: string
}

export interface LineItemsSubtotalPrice {
  amount: number
  currencyCode: string
  __typename: string
}

export interface PriceV2 {
  amount: number
  currencyCode: string
  __typename: string
}

export interface ShippingLine {
  handle: string
  priceV2: PriceV2
  title: string
  __typename: string
}

export interface Checkout {
  id: string
  availableShippingRates?: AvailableShippingRate
  webUrl: string
  lineItems: LineItem
  currencyCode: string
  paymentDueV2: PaymentDueV2
  subtotalPriceV2: SubtotalPriceV2
  totalPriceV2: TotalPriceV2
  totalTaxV2: TotalTaxV2
  totalDuties?: unknown
  lineItemsSubtotalPrice: LineItemsSubtotalPrice
  taxExempt: boolean
  taxesIncluded: boolean
  shippingLine: ShippingLine
  __typename: string
}

export interface RootObject {
  checkout: Checkout
  checkoutUserErrors: unknown[]
  __typename: string
}
