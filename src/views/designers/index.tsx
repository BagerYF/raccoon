import React, { useEffect, useState } from 'react'
import { kDesignersAllMaps } from '../../data/designer'
import './index.css'
import { Input } from 'antd'
import Icons from '../../assets/icons'

function DesignersView() {
  const [showData, setShowData] = useState<{ [key: string]: string[] }>({})
  const [showIndex, setShowIndex] = useState<string[]>([])
  const [alphaArray, setAlphaArray] = useState<string[]>([])

  const allDesigners = Object.keys(kDesignersAllMaps)

  useEffect(() => {
    const tempArray: string[] = ['#']
    for (let i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i++) {
      tempArray.push(String.fromCharCode(i))
    }
    setAlphaArray(tempArray)

    initData('')
  }, [])

  function classifyAndSortStringArray(arr: string[]) {
    const result: { [key: string]: string[] } = {}
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    for (const str of arr) {
      const firstLetter = str.charAt(0).toUpperCase()
      if (letters.includes(firstLetter)) {
        if (!result[firstLetter]) {
          result[firstLetter] = []
        }
        result[firstLetter].push(str)
      } else {
        if (!result['#']) {
          result['#'] = []
        }
        result['#'].push(str)
      }
    }

    for (const key in result) {
      result[key].sort()
    }

    return result
  }

  function searchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const str = e.target.value
    initData(str)
  }

  function initData(str: string) {
    if (str === '') {
      const tempData = classifyAndSortStringArray(allDesigners)
      const tempIndex = Object.keys(tempData).sort()
      setShowIndex(tempIndex)
      setShowData(tempData)
    } else {
      const tempData = classifyAndSortStringArray(
        allDesigners.filter((e) =>
          e.toLocaleLowerCase().includes(str.toLocaleLowerCase())
        )
      )
      const tempIndex = Object.keys(tempData).sort()
      setShowIndex(tempIndex)
      setShowData(tempData)
    }
  }

  return (
    <div className='bgc'>
      <div className='search-head'>
        <Input
          placeholder='Search Shopify'
          style={{ width: '270px', height: '40px' }}
          prefix={
            <img
              src={Icons.search}
              style={{ width: '14px', marginRight: '8px' }}
              alt=''
            />
          }
          onChange={searchChange}
        />
        {alphaArray.map((item) => (
          <div
            key={item}
            className={showIndex.indexOf(item) === -1 ? 'no-exist' : ''}
          >
            {item}
          </div>
        ))}
      </div>
      {showIndex.map((item) => (
        <div className='category' key={item}>
          <div className='category-title'>{item}</div>
          <div className='sub-category-bg'>
            {showData[item].map((sItem) => (
              <div className='sub-category' key={sItem}>
                {sItem}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default DesignersView
