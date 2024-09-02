export interface SortObject {
  name: string
  reverse: boolean
  sortKey: string
}

export const kSortMap: SortObject[] = [
  { name: 'Most Relevant', reverse: false, sortKey: 'RELEVANCE' },
  { name: 'Alphabetically, A-Z', reverse: false, sortKey: 'TITLE' },
  { name: 'Alphabetically, Z-A', reverse: true, sortKey: 'TITLE' },
  { name: 'New In', reverse: false, sortKey: 'CREATED' },
  { name: 'Price, low to high', reverse: false, sortKey: 'PRICE' },
  { name: 'Price, high to low', reverse: true, sortKey: 'PRICE' },
]
