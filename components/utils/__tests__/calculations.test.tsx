import React from 'react'
import { mount } from 'enzyme'
import { getProportions, useProportions } from '../calculations'

describe('calculations', () => {
  it('should return ratio and limit the length of decimals', () => {
    expect(getProportions(0, 100)).toEqual(0)
    expect(getProportions(50, 100)).toEqual(50)
    expect(getProportions(11.22, 100)).toEqual(11.22)
    expect(getProportions(10, 11, 4)).toEqual(90.9091)
    expect(getProportions(10, 11, 3)).toEqual(90.909)
  })
  
  it('should be return max or min when out of range', () => {
    expect(getProportions(101, 100)).toEqual(100)
    expect(getProportions(-1, 100)).toEqual(0)
    expect(getProportions(-10, 10)).toEqual(0)
    expect(getProportions(3, 2)).toEqual(100)
  })
  
  it('should be return min-value when value is not number', () => {
    const mock = getProportions as any
    expect(mock('test', 10)).toEqual(0)
    expect(mock('-', 10)).toEqual(0)
    expect(mock('', 10)).toEqual(0)
  })
  
  it('should be return original value when the length is reasonable', () => {
    expect(getProportions(3, 10, 10)).toEqual(30)
    expect(getProportions(3, 16, 10)).toEqual(18.75)
  })
  
  it('should work with hooks', () => {
    type Params = { value: number, max: number, maxFixed?: number }
    const MockComponent: React.FC<Params> = ({ value, max, maxFixed }) => {
      const val = useProportions(value, max, maxFixed)
      return <span>{val}</span>
    }
    const wrapper = mount(<MockComponent value={1} max={10} />)
    expect(wrapper.find('span').text())
      .toEqual(`${getProportions(1, 10)}`)
  
    wrapper.setProps({ value: 10, max: 5, maxFixed: 2 })
    expect(wrapper.find('span').text())
      .toEqual(`${getProportions(10, 5, 2)}`)
  })
})
