import React from 'react'
import { render, mount } from 'enzyme'
import { Capacity } from '../../index'

describe('Capacity', () => {
  it('should render value correctly', () => {
    const wrapper = mount(<Capacity value={50} />)
    expect(() => wrapper.unmount()).not.toThrow()
  })
  
  it('should render title correctly', () => {
    const wrapper = mount(<Capacity value={50} />)
    const el = wrapper.find('.capacity').first()
    const title = el.getDOMNode().getAttribute('title')
    expect(title).toEqual('50%')
  })
  
  it('should render different widths based on limit-value', () => {
    const wrapper = render(
      <div>
        <Capacity value={20} />
        <Capacity value={20} limit={50} />
        <Capacity value={20} limit={30} />
      </div>
    )
    
    expect(wrapper).toMatchSnapshot()
  })
  
  it('should override background color', () => {
    const capacity = render(<Capacity value={50} color="white" />)
    expect(capacity).toMatchSnapshot()
  })
})
