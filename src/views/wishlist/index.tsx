import React from 'react'
import Icons from '../../assets/icons'
import './index.css'
import { useDispatch, useSelector } from 'react-redux'
import { removeWishlist } from '../../redux/store/wishlist_slice'
import { RootState } from '../../redux'

function WishlistView() {
  const dispatch = useDispatch()
  const wishlist = useSelector((state: RootState) => state.wishlist.wishlist)

  return (
    <div className='bgc'>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
        <div
          style={{
            fontSize: '24px',
            lineHeight: '28px',
            fontWeight: 'bold',
            marginRight: '12px',
          }}
        >
          Your Wishlist
        </div>
        <img src={Icons.heart_b} style={{ width: '16px' }} alt='' />
        {wishlist.length > 0 ? (
          <div style={{ color: '#757575', marginLeft: '8px' }}>
            {wishlist.length} Items
          </div>
        ) : null}
      </div>
      {wishlist.length === 0 ? (
        <div>
          <div style={{ lineHeight: '20px' }}>Your wishlist is empty</div>
          <div style={{ lineHeight: '20px', color: '#757575' }}>
            Add your favorite items to this wishlist as you shop
          </div>
          <div style={{ lineHeight: '20px', marginTop: '8px' }}>
            Start shopping
          </div>
        </div>
      ) : null}
      <div style={{ display: 'flex', flexWrap: 'wrap', margin: '50px 0' }}>
        {wishlist.map((item) => (
          <div key={item.id} style={{ width: '24%' }}>
            <div style={{ margin: '30px' }}>
              <div style={{ display: 'flex', justifyContent: 'end' }}>
                <div
                  className='delete-bg'
                  onClick={() => {
                    dispatch(removeWishlist(item))
                  }}
                >
                  <img src={Icons.cross} style={{ width: '16px' }} alt='' />
                </div>
              </div>
              <div style={{ padding: '20px' }}>
                <img
                  src={
                    item.images.edges.length > 0 &&
                    item.images.edges[0].node.url != null
                      ? item.images.edges[0].node.url
                      : 'https://pic.rmb.bdstatic.com/bjh/news/4a7e614df95be4dd84daa57a080753297365.jpeg'
                  }
                  style={{
                    width: '100%',
                    aspectRatio: '9 / 10',
                    objectFit: 'contain',
                  }}
                  alt=''
                />
                <div className='p-item-title'>{item.title}</div>
                <div className='p-item-subtitle'>{item.productType}</div>
                {item.variants.edges[0].node.compareAtPrice != null ? (
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
                      {item.variants.edges[0].node.compareAtPrice.currencyCode}
                      {item.variants.edges[0].node.compareAtPrice.amount}
                    </span>
                    &nbsp;
                    <span style={{ color: '#cb0000' }}>
                      {item.variants.edges[0].node.price.currencyCode}
                      {item.variants.edges[0].node.price.amount}
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
                      {item.variants.edges[0].node.priceV2.currencyCode}
                      {item.variants.edges[0].node.priceV2.amount}
                    </span>
                  </div>
                )}
                <div className='add-btn'>Add to bag</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WishlistView
