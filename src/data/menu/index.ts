export const kSuggestedMaps: string[] = [
  'Alexander McQueen',
  'Balenciaga',
  'Bottega Veneta',
  'Christian Louboutin',
  'Dolce & Gabbana',
  'Fendi',
  'Gucci',
  'Off-White',
  'Prada',
  'Saint Laurent',
  'Valentino',
]

export interface CategoryObject {
  name: string
  children: CategoryObject[]
}

export const kCategoryMaps: CategoryObject[] = [
  {
    name: 'Women',
    children: [
      {
        name: 'Clothing',
        children: [
          { name: 'All Clothing', children: [] },
          { name: 'Coats', children: [] },
          { name: 'Dresses', children: [] },
          { name: 'Jackets', children: [] },
          { name: 'Jeans', children: [] },
          { name: 'Jumpsuits', children: [] },
          { name: 'Knitwear', children: [] },
          { name: 'Pants', children: [] },
          { name: 'Shorts', children: [] },
          { name: 'Skirts', children: [] },
          { name: 'Sweaters', children: [] },
          { name: 'Tops', children: [] },
        ],
      },
      {
        name: 'Shoes',
        children: [
          { name: 'All Shoes', children: [] },
          { name: 'Boots', children: [] },
          { name: 'Flat Shoes', children: [] },
          { name: 'Lace-Up Shoes', children: [] },
          { name: 'Pumps', children: [] },
          { name: 'Sandals', children: [] },
          { name: 'Sneakers', children: [] },
        ],
      },
      {
        name: 'Bags',
        children: [
          { name: 'All Bags', children: [] },
          { name: 'Backpacks', children: [] },
          { name: 'Clutch Bags', children: [] },
          { name: 'Crossbody bags', children: [] },
          { name: 'Tote Bags', children: [] },
        ],
      },
      {
        name: 'Accessories',
        children: [
          { name: 'All Accessories', children: [] },
          { name: 'Belts', children: [] },
          // {"name": "Clothing Patches", "children": []},
          { name: 'Gloves', children: [] },
          { name: 'Hats', children: [] },
          { name: 'Scarves', children: [] },
          { name: 'Wallets', children: [] },
        ],
      },
    ],
  },
  {
    name: 'Men',
    children: [
      {
        name: 'Clothing',
        children: [
          { name: 'All Clothing', children: [] },
          { name: 'Coats', children: [] },
          { name: 'Jackets', children: [] },
          { name: 'Jeans', children: [] },
          { name: 'Knitwear', children: [] },
          { name: 'Pants', children: [] },
          { name: 'Polo Shirts', children: [] },
          { name: 'Shirts', children: [] },
          { name: 'Shorts', children: [] },
          { name: 'Sweaters', children: [] },
          { name: 'T-Shirts And Vests', children: [] },
          { name: 'Underwear And Socks', children: [] },
        ],
      },
      {
        name: 'Shoes',
        children: [
          { name: 'All Shoes', children: [] },
          { name: 'Boots', children: [] },
          { name: 'Lace-Up Shoes', children: [] },
          { name: 'Loafers', children: [] },
          { name: 'Sneakers', children: [] },
        ],
      },
      {
        name: 'Bags',
        children: [
          { name: 'All Bags', children: [] },
          { name: 'Backpacks', children: [] },
          { name: 'Laptop Bags', children: [] },
          { name: 'Luggage And Travel', children: [] },
        ],
      },
      {
        name: 'Accessories',
        children: [
          { name: 'All Accessories', children: [] },
          { name: 'Belts', children: [] },
          { name: 'Hats', children: [] },
          { name: 'Sunglasses', children: [] },
        ],
      },
    ],
  },
  {
    name: 'Kids',
    children: [
      {
        name: 'Baby Girls',
        children: [
          { name: 'Clothing', children: [] },
          { name: 'Shoes', children: [] },
          { name: 'Accessories', children: [] },
        ],
      },
      {
        name: 'Baby Boys',
        children: [
          { name: 'Clothing', children: [] },
          { name: 'Shoes', children: [] },
          { name: 'Accessories', children: [] },
        ],
      },
      {
        name: 'Girls',
        children: [
          { name: 'Clothing', children: [] },
          { name: 'Shoes', children: [] },
          { name: 'Accessories', children: [] },
        ],
      },
      {
        name: 'Boys',
        children: [
          { name: 'Clothing', children: [] },
          { name: 'Shoes', children: [] },
          { name: 'Accessories', children: [] },
        ],
      },
      {
        name: 'Teen Girls',
        children: [
          { name: 'Clothing', children: [] },
          { name: 'Shoes', children: [] },
          { name: 'Accessories', children: [] },
        ],
      },
      {
        name: 'Teen Boys',
        children: [
          { name: 'Clothing', children: [] },
          { name: 'Shoes', children: [] },
          { name: 'Accessories', children: [] },
        ],
      },
    ],
  },
  {
    name: 'Designers',
    children: [
      {
        name: 'Featured Designers',
        children: [
          { name: 'Alexander McQueen', children: [] },
          { name: 'Balenciaga', children: [] },
          { name: 'Bottega Veneta', children: [] },
          { name: 'Christian Louboutin', children: [] },
          { name: 'Dolce & Gabbana', children: [] },
          { name: 'Fendi', children: [] },
          { name: 'Gucci', children: [] },
          { name: 'Off-White', children: [] },
          { name: 'Prada', children: [] },
          { name: 'Saint Laurent', children: [] },
          { name: 'Valentino', children: [] },
        ],
      },
    ],
  },
  {
    name: 'Sale',
    children: [
      {
        name: 'Sale',
        children: [
          { name: 'Women`s Clothing', children: [] },
          { name: 'Women`s Shoes', children: [] },
          { name: 'Women`s Bags', children: [] },
          { name: 'Women`s Accessories', children: [] },
          { name: 'Men`s Clothing', children: [] },
          { name: 'Men`s Shoes', children: [] },
          { name: 'Men`s Bags', children: [] },
          { name: 'Men`s Accessories', children: [] },
        ],
      },
      {
        name: 'Top Designers On Sale',
        children: [
          { name: 'Alexander McQueen', children: [] },
          { name: 'Balmain', children: [] },
          { name: 'Bottega Veneta', children: [] },
          { name: 'Christian Louboutin', children: [] },
          { name: 'Dolce & Gabbana', children: [] },
          { name: 'Chloe', children: [] },
          { name: 'Gucci', children: [] },
          { name: 'Loewe', children: [] },
          { name: 'Prada', children: [] },
          { name: 'Max Mara', children: [] },
          { name: 'Versace', children: [] },
        ],
      },
    ],
  },
]
