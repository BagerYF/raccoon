import React, { useEffect, useState } from 'react'
import { ProductSchemas } from '../../server/graphql/schema/product_schema'
import { apolloClient } from '../../server/graphql'
import config from '../../config'
import { Checkbox, Collapse, CollapseProps, GetProp, Popover } from 'antd'
import './index.css'
import Icons from '../../assets/icons'
import { kSortMap, SortObject } from '../../data/product'
import { useNavigate } from 'react-router-dom'
import LoadingView from '../../components/loading_view'
import { Edge, Filter } from '../../data/product/model/product'

function ProductListView() {
  const [products, setProducts] = useState<Edge[]>([])
  const [filters, setFilters] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState<CollapseProps['items']>([])
  const [sortName, setSortName] = useState('Most Relevant')
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    getData()
  }, [filters])

  const getData = async () => {
    setProducts([])
    const result = await apolloClient.query({
      query: ProductSchemas.productListByCollection,
      variables: {
        id: config.collectionGid,
        first: 50,
        reverse: false,
        sortKey: 'RELEVANCE',
        filters: filters.map((e) => JSON.parse(e)),
      },
    })
    setProducts(result.data.collection.products.edges)
    initFilters(result.data.collection.products.filters)
  }

  function initFilters(tempFilters: Filter[]) {
    const tempList: CollapseProps['items'] = []
    for (let index = 0; index < tempFilters.length; index++) {
      const element = tempFilters[index]
      tempList.push({
        key: index,
        label: element.label,
        children: (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {element.values.map((e) => (
              <Checkbox key={e.input} value={e.input} className='e-checkbox'>
                {e.label} ({e.count})
              </Checkbox>
            ))}
          </div>
        ),
      })
    }
    setShowFilters(tempList)
  }

  const filterOnChange: GetProp<typeof Checkbox.Group, 'onChange'> = (
    checkedValues
  ) => {
    console.log(checkedValues)
    setFilters(checkedValues as string[])
  }

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
  }

  const handleSort = (sort: SortObject) => {
    setSortName(sort.name)
    setOpen(false)
  }

  return products.length > 0 ? (
    <div className='bgc'>
      <div style={{ margin: '24px 0' }}>
        <div
          style={{ fontSize: '24px', lineHeight: '28px', fontWeight: 'bold' }}
        >
          All
        </div>
        <div
          style={{
            lineHeight: '24px',
            color: '#424242',
            width: '50%',
            marginTop: '8px',
          }}
        >
          Discover our latest luxury fashion collection, featuring exquisite
          clothing, shoes, bags, and accessories crafted from the finest
          materials with a modern twist. From statement coats and luxurious
          knitwear to stunning heels and coveted handbags, elevate your wardrobe
          with timeless elegance and sophistication.
        </div>
      </div>
      <div
        style={{
          height: '48px',
          display: 'flex',
          justifyContent: 'space-between',
          lineHeight: '48px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '25%',
            fontWeight: 'bold',
          }}
        >
          <div>Filter</div>
          <div>Clear</div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '75%',
            justifyContent: 'right',
            position: 'relative',
          }}
        >
          <Popover
            content={
              <div className='sort'>
                {kSortMap.map((item) => (
                  <div
                    key={item.name}
                    className='sort-item'
                    style={item.name === sortName ? { fontWeight: 'bold' } : {}}
                    onClick={() => handleSort(item)}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            }
            open={open}
            onOpenChange={handleOpenChange}
            trigger='click'
            placement='bottomRight'
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ fontWeight: 'bold' }}>{sortName}</div>
              <img
                src={Icons.arrow_down}
                style={{ width: '16px', marginLeft: '8px' }}
                alt=''
              />
            </div>
          </Popover>
        </div>
      </div>
      <div style={{ display: 'flex', width: '100%' }}>
        <div style={{ width: '25%' }}>
          <Checkbox.Group onChange={filterOnChange} style={{ width: '100%' }}>
            <Collapse
              items={showFilters}
              defaultActiveKey={[]}
              expandIconPosition='end'
              bordered={false}
              style={{ backgroundColor: '#fff', width: '100%' }}
            />
          </Checkbox.Group>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', width: '75%' }}>
          {products.map((item) => (
            <div
              key={item.node.id}
              style={{ width: '33%' }}
              onClick={() => {
                navigate(`/product-detail?productId=${item.node.id}`)
              }}
            >
              <div style={{ margin: '30px' }}>
                {item.node.images.edges.length > 0 &&
                item.node.images.edges[0].node.url != null ? (
                  <img
                    src={item.node.images.edges[0].node.url}
                    style={{ width: '100%', aspectRatio: '9 / 10' }}
                    alt=''
                  />
                ) : (
                  <img
                    src='https://pic.rmb.bdstatic.com/bjh/news/4a7e614df95be4dd84daa57a080753297365.jpeg'
                    style={{ width: '100%', aspectRatio: '9 / 10' }}
                    alt=''
                  />
                )}

                <div className='p-item-title'>{item.node.title}</div>
                <div className='p-item-subtitle'>{item.node.productType}</div>
                {item.node.variants.edges[0].node.compareAtPrice != null ? (
                  <div
                    style={{
                      width: '100%',
                      fontSize: '16px',
                      lineHeight: '22px',
                      marginTop: '10px',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '14px',
                        color: '#616161',
                        textDecoration: 'line-through',
                      }}
                    >
                      {
                        item.node.variants.edges[0].node.compareAtPrice
                          .currencyCode
                      }
                      {item.node.variants.edges[0].node.compareAtPrice.amount}
                    </span>
                    &nbsp;
                    <span style={{ color: '#cb0000' }}>
                      {item.node.variants.edges[0].node.price.currencyCode}
                      {item.node.variants.edges[0].node.price.amount}
                    </span>
                  </div>
                ) : (
                  <div
                    style={{
                      width: '100%',
                      fontSize: '16px',
                      lineHeight: '22px',
                      marginTop: '10px',
                    }}
                  >
                    <span>
                      {item.node.variants.edges[0].node.price.currencyCode}
                      {item.node.variants.edges[0].node.price.amount}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <LoadingView height={'400px'} />
  )
}

export default ProductListView
