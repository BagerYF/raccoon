export interface TotalAmount {
  amount: string
  currencyCode: string
  __typename: string
}

export interface SubtotalAmount {
  amount: string
  currencyCode: string
  __typename: string
}

export interface Cost {
  totalAmount: TotalAmount
  subtotalAmount: SubtotalAmount
  __typename: string
}

export interface CompareAtPrice {
  amount: string
  currencyCode: string
  __typename: string
}

export interface Price {
  amount: string
  currencyCode: string
  __typename: string
}

export interface Image {
  id: string
  url: string
  __typename: string
}

export interface Product {
  title: string
  vendor: string
  productType: string
  __typename: string
}

export interface Merchandise {
  id: string
  compareAtPrice: CompareAtPrice
  title: string
  price: Price
  quantityAvailable: number
  image: Image
  product: Product
  __typename: string
}

export interface Node {
  id: string
  quantity: number
  cost: Cost
  merchandise: Merchandise
  attributes: unknown[]
  __typename: string
}

export interface Edge {
  node: Node
  __typename: string
}

export interface Line {
  edges: Edge[]
  __typename: string
}

export interface TotalAmount {
  amount: string
  currencyCode: string
  __typename: string
}

export interface SubtotalAmount {
  amount: string
  currencyCode: string
  __typename: string
}

export interface TotalTaxAmount {
  amount: string
  currencyCode: string
  __typename: string
}

export interface Cost {
  totalAmount: TotalAmount
  subtotalAmount: SubtotalAmount
  totalTaxAmount: TotalTaxAmount
  totalDutyAmount?: unknown
  __typename: string
}

export interface BuyerIdentity {
  email?: unknown
  phone?: unknown
  customer?: unknown
  countryCode?: unknown
  __typename: string
}

export interface Cart {
  id: string
  totalQuantity: number
  createdAt: string
  updatedAt: string
  lines: Line
  attributes: unknown[]
  cost: Cost
  buyerIdentity: BuyerIdentity
  __typename: string
}

export interface RootObject {
  cart: Cart
  __typename: string
}
