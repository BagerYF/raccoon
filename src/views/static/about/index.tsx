function AboutView() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '0 100px',
      }}
    >
      <div style={{ marginBottom: '80px' }}>
        <div style={{ fontSize: '30px', margin: '22px 0' }}>ABOUT US</div>
        <div style={{ fontSize: '16px', lineHeight: '24px' }}>
          Shopify is your online destination exclusively for luxury fashion. We
          sell a huge range of products from over 500 designers, which include
          an extensive range of women’s and men’s wear from world-renowned
          brands such as Prada, Gucci, Saint Laurent, Balenciaga and Valentino.
          <br />
          <br />
          We pride ourselves on providing outstanding customer service and a
          seamless user experience through every facet — cutting-edge
          technology, carefully selected products and brands with a secure and
          easy-to-use payment system. <br />
          <br />
          We also provide express shipping so you receive your items within the
          time we promised, as well as easy returns so our customers can shop
          with confidence.
        </div>
      </div>
    </div>
  )
}

export default AboutView
