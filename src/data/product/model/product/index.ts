export interface Node {
  id: string
  url: string
  __typename: string
}

export interface Edge {
  node: Node
  __typename: string
}

export interface Image {
  edges: Edge[]
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
  url: string
  __typename: string
}

export interface Node {
  id: string
  compareAtPrice: CompareAtPrice
  title: string
  price: Price
  image: Image
  __typename: string
}

export interface Edge {
  node: Node
  __typename: string
}

export interface Variant {
  edges: Edge[]
  __typename: string
}

export interface Node {
  id: string
  title: string
  vendor: string
  productType: string
  handle: string
  images: Image
  variants: Variant
  __typename: string
}

export interface Edge {
  node: Node
  __typename: string
}

export interface PageInfo {
  endCursor: string
  hasNextPage: boolean
  hasPreviousPage: boolean
  startCursor: string
  __typename: string
}

export interface Value {
  id: string
  count: number
  input: string
  label: string
  __typename: string
}

export interface Filter {
  id: string
  label: string
  type: string
  values: Value[]
  __typename: string
}

export interface Product {
  edges: Edge[]
  pageInfo: PageInfo
  filters: Filter[]
  __typename: string
}

export interface Collection {
  id: string
  handle: string
  title: string
  description: string
  products: Product
  __typename: string
}

export interface RootObject {
  collection: Collection
}
