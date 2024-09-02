import { DocumentNode, gql } from '@apollo/client'

const checkoutCommon: string = `id
    webUrl
    lineItems(first: 5) {
      edges {
        node {
          id
          title
          quantity
          variant {
            image {
              url
            }
            title
            price {
              amount
              currencyCode
            }
            product {
              title
              productType
              vendor
            }
          }
        }
      }
    }
    currencyCode
    paymentDueV2 {
      amount
      currencyCode    
    }
    subtotalPriceV2 {
      amount
      currencyCode
    }
    totalPriceV2 {
      amount
      currencyCode
    }
    totalTaxV2 {
      amount
      currencyCode
    }
    totalDuties {
      amount
      currencyCode
    }
    lineItemsSubtotalPrice {
      amount
      currencyCode
    }
    taxExempt
    taxesIncluded`

export const CheckoutSchemas: { [key: string]: DocumentNode } = {
  checkoutCreate: gql`
mutation checkoutCreate(\$input: CheckoutCreateInput!) {
  checkoutCreate(input: \$input) {
    checkout {
      ${checkoutCommon}
    }
    checkoutUserErrors {
      code
      field
      message
    }
    queueToken
  }
}
`,

  checkoutShippingAddressUpdate: gql`
mutation checkoutShippingAddressUpdateV2(\$checkoutId: ID!, \$shippingAddress: MailingAddressInput!) {
  checkoutShippingAddressUpdateV2(checkoutId: \$checkoutId, shippingAddress: \$shippingAddress) {
    checkout {
      ${checkoutCommon}
      availableShippingRates {
        ready
        shippingRates {
          handle
          priceV2 {
            amount
            currencyCode
          }
          title
        }
      }
    }
    checkoutUserErrors {
      code
      field
      message
    }
  }
}
`,

  checkoutShippingLines: gql`
    query checkoutShippingLines($id: ID!) {
      node(id: $id) {
        ... on Checkout {
          id
          webUrl
          availableShippingRates {
            ready
            shippingRates {
              handle
              priceV2 {
                amount
                currencyCode
              }
              title
            }
          }
        }
      }
    }
  `,

  checkoutShippingLineUpdate: gql`
mutation checkoutShippingLineUpdate(\$checkoutId: ID!, \$shippingRateHandle: String!) {
  checkoutShippingLineUpdate(checkoutId: \$checkoutId, shippingRateHandle: \$shippingRateHandle) {
    checkout {
      ${checkoutCommon}
      availableShippingRates {
        ready
        shippingRates {
          handle
          priceV2 {
            amount
            currencyCode
          }
          title
        }
      }
      shippingLine {
        handle
        priceV2 {
          amount
          currencyCode
        }
        title
      }
    }
    checkoutUserErrors {
      code
      field
      message
    }
  }
}
`,

  checkoutDiscountCodeApplyV2: gql`
mutation checkoutDiscountCodeApplyV2(\$checkoutId: ID!, \$discountCode: String!) {
  checkoutDiscountCodeApplyV2(checkoutId: \$checkoutId, discountCode: \$discountCode) {
    checkout {
      ${checkoutCommon}
      availableShippingRates {
        ready
        shippingRates {
          handle
          priceV2 {
            amount
            currencyCode
          }
          title
        }
      }
      shippingLine {
        handle
        priceV2 {
          amount
          currencyCode
        }
        title
      }
    }
    checkoutUserErrors {
      code
      field
      message
    }
  }
}
`,

  checkoutDiscountCodeRemove: gql`
mutation checkoutDiscountCodeRemove(\$checkoutId: ID!) {
  checkoutDiscountCodeRemove(checkoutId: \$checkoutId) {
    checkout {
      ${checkoutCommon}
      availableShippingRates {
        ready
        shippingRates {
          handle
          priceV2 {
            amount
            currencyCode
          }
          title
        }
      }
      shippingLine {
        handle
        priceV2 {
          amount
          currencyCode
        }
        title
      }
    }
    checkoutUserErrors {
      code
      field
      message
    }
  }
}
`,

  checkoutCustomerAssociateV2: gql`
mutation checkoutCustomerAssociateV2(\$checkoutId: ID!, \$customerAccessToken: String!) {
  checkoutCustomerAssociateV2(checkoutId: \$checkoutId, customerAccessToken: \$customerAccessToken) {
    checkout {
      ${checkoutCommon}
      availableShippingRates {
        ready
        shippingRates {
          handle
          priceV2 {
            amount
            currencyCode
          }
          title
        }
      }
      shippingLine {
        handle
        priceV2 {
          amount
          currencyCode
        }
        title
      }
    }
    checkoutUserErrors {
      code
      field
      message
    }
    customer {
      id
    }
  }
}
`,

  checkoutCompleteFree: gql`
mutation checkoutCompleteFree(\$checkoutId: ID!) {
  checkoutCompleteFree(checkoutId: \$checkoutId) {
    checkout {
      ${checkoutCommon}
      availableShippingRates {
        ready
        shippingRates {
          handle
          priceV2 {
            amount
            currencyCode
          }
          title
        }
      }
      shippingLine {
        handle
        priceV2 {
          amount
          currencyCode
        }
        title
      }
    }
    checkoutUserErrors {
      code
      field
      message
    }
  }
}
`,

  checkoutCompleteWithCreditCardV2: gql`
mutation checkoutCompleteWithCreditCardV2(\$checkoutId: ID!, \$payment: CreditCardPaymentInputV2!) {
  checkoutCompleteWithCreditCardV2(checkoutId: \$checkoutId, payment: \$payment) {
    checkout {
      ${checkoutCommon}
      availableShippingRates {
        ready
        shippingRates {
          handle
          priceV2 {
            amount
            currencyCode
          }
          title
        }
      }
      shippingLine {
        handle
        priceV2 {
          amount
          currencyCode
        }
        title
      }
    }
    checkoutUserErrors {
      code
      field
      message
    }
    payment {
      id
    }
  }
}
`,
}
