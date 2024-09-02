export interface Item {
  text?: string
  brand?: string
  productName?: string
  absoluteImageUrl?: string
}

export interface HomeObject {
  name: string
  title: string
  subTitle: string
  items: Item[]
}

export const kHomeMaps: HomeObject[] = [
  {
    name: 'FirstSection',
    title: '',
    subTitle: '',
    items: [
      {
        text: 'Explore our range of world-class designer brands selling at up to 80% off',
        absoluteImageUrl:
          'https://hbimg.b0.upaiyun.com/d5ffcc83ca2ef6f5878009a33e8f686a47ca28582cc78-WSFdfB_fw658',
      },
    ],
  },
  {
    name: 'PopularSection',
    title: '',
    subTitle: '',
    items: [
      {
        brand: "Women's Collection",
        productName: "Shop our women's collection featuring over 500 designers",
      },
      {
        brand: 'Spotlight on Elisabetta Franchi',
        productName:
          "Discover the refined and stylish women's collection of Italian fashion house Elisabetta Franchi",
      },
    ],
  },
  {
    name: 'NewArrivalSection',
    title: 'New Arrivals',
    subTitle:
      'Stay up-to-date with the latest styles from our extensive range of designers',
    items: [
      {
        text: 'Shop Clothing',
      },
      {
        text: 'Shop Shoes',
      },
      {
        text: 'Shop Bags',
      },
      {
        text: 'Shop Accessories',
      },
    ],
  },
  {
    name: 'PrimarySection',
    title: 'Neues von Fendi',
    subTitle: 'Entdecken Sie einen der gefragtesten Designer der Welt',
    items: [
      {
        brand: 'Neues von Fendi',
        productName:
          'Entdecken Sie eine der gefragtesten Designermarken der Welt',
      },
      {
        brand: 'Neue Saison-Taschen',
        productName: 'Shoppen Sie unsere umfangreiche Auswahl an Taschen',
      },
    ],
  },
  {
    name: 'NewSeasonSection',
    title: 'New Season Fashion',
    subTitle:
      'Transform your look this season with products from these iconic brands',
    items: [
      {
        text: 'Saint Laurent',
      },
      {
        text: 'Marine Serre',
      },
      {
        text: 'Prada',
      },
      {
        text: 'Alexander McQueen',
      },
    ],
  },
]
