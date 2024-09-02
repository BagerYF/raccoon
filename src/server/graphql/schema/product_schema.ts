import { DocumentNode, gql } from '@apollo/client'

export const ProductSchemas: { [key: string]: DocumentNode } = {
  productListByCollection: gql`
    query collection(
      $id: ID!
      $first: Int!
      $after: String
      $sortKey: ProductCollectionSortKeys
      $filters: [ProductFilter!]
      $reverse: Boolean
    ) {
      collection(id: $id) {
        id
        handle
        title
        description
        products(
          first: $first
          reverse: $reverse
          after: $after
          sortKey: $sortKey
          filters: $filters
        ) {
          edges {
            node {
              id
              title
              vendor
              productType
              handle
              images(first: 5) {
                edges {
                  node {
                    id
                    url
                  }
                }
              }
              variants(first: 5) {
                edges {
                  node {
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
                    image {
                      url
                    }
                  }
                }
              }
            }
          }
          pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
          }
          filters {
            id
            label
            type
            values {
              id
              count
              input
              label
            }
          }
        }
      }
    }
  `,
  productList: gql`
    query products($first: Int!, $after: String) {
      products(first: $first, reverse: true, after: $after) {
        edges {
          node {
            id
            title
            vendor
            productType
            handle
            images(first: 5) {
              edges {
                node {
                  id
                  url
                }
              }
            }
            variants(first: 5) {
              edges {
                node {
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
                  image {
                    url
                  }
                }
              }
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
        filters {
          id
          label
          type
          values {
            id
            count
            input
            label
          }
        }
      }
    }
  `,

  productDetail: gql`
    query getProductById($id: ID!) {
      product(id: $id) {
        id
        title
        vendor
        productType
        handle
        description
        images(first: 5) {
          edges {
            node {
              id
              url
            }
          }
        }
        variants(first: 10) {
          edges {
            node {
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
              priceV2 {
                amount
                currencyCode
              }
              quantityAvailable
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
  `,

  recommendedList: gql`
    query productRecommendations($productId: ID!) {
      productRecommendations(productId: $productId) {
        id
        title
        vendor
        productType
        images(first: 5) {
          edges {
            node {
              id
              url
            }
          }
        }
        variants(first: 5) {
          edges {
            node {
              id
              title
              availableForSale
              currentlyNotInStock
              priceV2 {
                amount
                currencyCode
              }
              quantityAvailable
              selectedOptions {
                name
                value
              }
              image {
                url
              }
            }
          }
        }
        priceRange {
          maxVariantPrice {
            amount
          }
          minVariantPrice {
            amount
          }
        }
      }
    }
  `,
}
