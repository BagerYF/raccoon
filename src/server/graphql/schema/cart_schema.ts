import { DocumentNode, gql } from '@apollo/client'

const cartCommon: string = `id
  totalQuantity
    createdAt
    updatedAt
    lines(first: 10) {
      edges {
        node {
          id
          quantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
            subtotalAmount {
              amount
              currencyCode
            }
          }
          merchandise {
            ... on ProductVariant {
              id
              compareAtPrice {
                  amount
                  currencyCode
              }
              title
              price {
                amount
                currencyCode
              }
              quantityAvailable
              image {
                  id
                  url
              }
              product{
                  title
                  vendor
                  productType
              }
            }
          }
          attributes {
            key
            value
          }
        }
      }
    }
    attributes {
      key
      value
    }
    cost {
      totalAmount {
        amount
        currencyCode
      }
      subtotalAmount {
        amount
        currencyCode
      }
      totalTaxAmount {
        amount
        currencyCode
      }
      totalDutyAmount {
        amount
        currencyCode
      }
    }
    buyerIdentity {
      email
      phone
      customer {
        id
      }
      countryCode
    }
`

export const CartSchema: { [key: string]: DocumentNode } = {
  queryCart: gql`
  query queryCart(\$id: ID!) {
    cart(id: \$id) {
      ${cartCommon}
    }
  }
`,

  createCart: gql`
mutation createCart(\$input: CartInput!){
  cartCreate (input: \$input) {
    cart{
      ${cartCommon}
    }
  }
}
`,

  addProductsToCart: gql`
  mutation addProductsToCart(\$cartId: ID!, \$lines: [CartLineInput!]!){
    cartLinesAdd(cartId: \$cartId, lines: \$lines) {
      cart{
        ${cartCommon}
      }
    }
  }
`,

  updateProductQuantityInCart: gql`
  mutation updateProductQuantityInCart(\$cartId: ID!, \$lines: [CartLineUpdateInput!]!){
    cartLinesUpdate(cartId: \$cartId, lines: \$lines) {
      cart{
        ${cartCommon}
      }
    }
  }
  `,

  removeProductFromCart: gql`
    mutation removeProductFromCart($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          ${cartCommon}
        }
      }
    }
  `,
}
