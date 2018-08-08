/* eslint-env mocha */

import {expect} from 'chai'
import {shallow} from 'enzyme'
import React from 'react'

import RawData from '../../../src/js/views/object/raw-data'

describe('RawData', () => {
  it('renders the given data', () => {
    const el = shallow(<RawData data='Hello World' />)
    const buf = Buffer.from('Hello World', 'utf-8')
    const dataString = `data:text/plain;charset=utf8;base64,${buf.toString('base64')}`

    expect(el.find('iframe')).to.have.attr('src', dataString)
  })

  it('limits the data to 10000 characters by default', () => {
    const data = Array(15000).fill('a').join('')
    const el = shallow(<RawData data={data} />)
    const buf = Buffer.from(data.substr(0, 10000), 'utf-8')
    const dataString = `data:text/plain;charset=utf8;base64,${buf.toString('base64')}`
    expect(el.find('iframe')).to.have.attr('src', dataString)
  })

  it('uses a custom limit', () => {
    const data = 'Hello World'
    const el = shallow(<RawData data={data} limit={2} />)
    const buf = Buffer.from('He', 'utf-8')
    const dataString = `data:text/plain;charset=utf8;base64,${buf.toString('base64')}`

    expect(el.find('iframe')).to.have.attr('src', dataString)
  })
})
