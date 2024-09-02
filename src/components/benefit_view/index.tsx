import Icons from '../../assets/icons'

function BenefitView() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        margin: '120px 0',
      }}
    >
      <div style={{ width: '24%' }}>
        <img src={Icons.star} style={{ width: '24px' }} alt='' />
        <div style={{ fontSize: '16px', lineHeight: '22px', marginTop: '8px' }}>
          Reviews
        </div>
        <div
          style={{
            fontSize: '16px',
            lineHeight: '22px',
            marginTop: '8px',
            color: '#505050',
          }}
        >
          See what our customers have to say about shopping with us
        </div>
        <div
          style={{
            lineHeight: '20px',
            marginTop: '8px',
            color: '#757575',
          }}
        >
          See our reviews
        </div>
      </div>
      <div
        style={{
          width: '24%',
        }}
      >
        <img src={Icons.tag} style={{ width: '24px' }} alt='' />
        <div
          style={{
            fontSize: '16px',
            lineHeight: '22px',
            marginTop: '8px',
          }}
        >
          A huge selection
        </div>
        <div
          style={{
            fontSize: '16px',
            lineHeight: '22px',
            marginTop: '8px',
            color: '#505050',
          }}
        >
          A massive collection of products from world- renowned designers
        </div>
        <div
          style={{
            lineHeight: '20px',
            marginTop: '8px',
            color: '#757575',
          }}
        >
          Shop the latest
        </div>
      </div>
      <div
        style={{
          width: '24%',
        }}
      >
        <img src={Icons.returns} style={{ width: '24px' }} alt='' />
        <div style={{ fontSize: '16px', lineHeight: '22px', marginTop: '8px' }}>
          Easy returns
        </div>
        <div
          style={{
            fontSize: '16px',
            lineHeight: '22px',
            marginTop: '8px',
            color: '#505050',
          }}
        >
          Shop in confidence with a quick and easy return process
        </div>
        <div style={{ lineHeight: '20px', marginTop: '8px', color: '#757575' }}>
          Return Policy
        </div>
      </div>
      <div style={{ width: '24%' }}>
        <img src={Icons.questions} style={{ width: '24px' }} alt='' />
        <div style={{ fontSize: '16px', lineHeight: '22px', marginTop: '8px' }}>
          Need Help?
        </div>
        <div
          style={{
            fontSize: '16px',
            lineHeight: '22px',
            marginTop: '8px',
            color: '#505050',
          }}
        >
          Our customer service team is available 7-days a week
        </div>
        <div style={{ lineHeight: '20px', marginTop: '8px', color: '#757575' }}>
          Contact us
        </div>
      </div>
    </div>
  )
}

export default BenefitView
