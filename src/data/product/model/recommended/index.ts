export interface ImageNode {
  id: string
  url: string
  __typename: string
}

export interface ImageEdge {
  node: ImageNode
  __typename: string
}

export interface Image {
  edges: ImageEdge[]
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

export interface VariantImage {
  url: string
  __typename: string
}

export interface VariantNode {
  id: string
  title: string
  availableForSale: boolean
  currentlyNotInStock: boolean
  priceV2: PriceV2
  quantityAvailable: number
  selectedOptions: SelectedOption[]
  image: VariantImage
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

export interface MaxVariantPrice {
  amount: string
  __typename: string
}

export interface MinVariantPrice {
  amount: string
  __typename: string
}

export interface PriceRange {
  maxVariantPrice: MaxVariantPrice
  minVariantPrice: MinVariantPrice
  __typename: string
}

export interface ProductRecommendation {
  id: string
  title: string
  vendor: string
  productType: string
  images: Image
  variants: Variant
  priceRange: PriceRange
  __typename: string
}

export interface RootObject {
  productRecommendations: ProductRecommendation[]
}
