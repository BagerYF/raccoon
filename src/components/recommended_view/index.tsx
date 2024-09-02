import React, { useEffect, useState } from 'react'
import { ProductSchemas } from '../../server/graphql/schema/product_schema'
import { apolloClient } from '../../server/graphql'
import { useNavigate } from 'react-router-dom'
import { ProductRecommendation } from '../../data/product/model/recommended'

function RecommendedView() {
  const [recommended, setRecommended] = useState<ProductRecommendation[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const result = await apolloClient.query({
      query: ProductSchemas.recommendedList,
      variables: {
        productId: 'gid://shopify/Product/7713246904542',
      },
    })
    setRecommended(result.data.productRecommendations)
  }

  return (
    <div>
      <div
        style={{ height: '1px', marginTop: '60px', backgroundColor: '#eeeeee' }}
      ></div>
      <div style={{ fontSize: '16px', fontWeight: 'bold', lineHeight: '54px' }}>
        Recommended
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          width: '100%',
        }}
      >
        {(recommended.length > 6 ? recommended.slice(0, 6) : recommended).map(
          (item) => (
            <div
              key={item.id}
              style={{ width: '16%' }}
              onClick={() => {
                navigate(`/product-detail?productId=${item.id}`)
              }}
            >
              <div style={{ margin: '10px 4px' }}>
                <img
                  src={
                    item.images.edges.length > 0 &&
                    item.images.edges[0].node.url != null
                      ? item.images.edges[0].node.url
                      : 'https://pic.rmb.bdstatic.com/bjh/news/4a7e614df95be4dd84daa57a080753297365.jpeg'
                  }
                  alt=''
                  style={{ width: '100%', aspectRatio: '9 / 10' }}
                />
                <div className='r-item-title'>{item.title}</div>
                <div className='r-item-subtitle'>{item.productType}</div>
                <div
                  style={{
                    width: '100%',
                    fontSize: '16px',
                    lineHeight: '22px',
                    marginTop: '10px',
                  }}
                >
                  <span>
                    {item.variants.edges[0].node.priceV2.currencyCode}
                    {item.variants.edges[0].node.priceV2.amount}
                  </span>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default RecommendedView
