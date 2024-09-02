export interface ImgNode {
  id: string
  url: string
  __typename: string
}

export interface ImgEdge {
  node: ImgNode
  __typename: string
}

export interface Image {
  edges: ImgEdge[]
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

export interface PriceV2 {
  amount: string
  currencyCode: string
  __typename: string
}

export interface SelectedOption {
  name: string
  value: string
  __typename: string
}

export interface VariantNode {
  id: string
  compareAtPrice: CompareAtPrice
  title: string
  price: Price
  priceV2: PriceV2
  quantityAvailable: number
  selectedOptions: SelectedOption[]
  __typename: string
}

export interface VariantEdge {
  node: VariantNode
  __typename: string
}

export interface Variant {
  edges: VariantEdge[]
  __typename: string
}

export interface Product {
  id: string
  title: string
  vendor: string
  productType: string
  handle: string
  description: string
  images: Image
  variants: Variant
  __typename: string
}

export interface RootObject {
  product: Product
}
