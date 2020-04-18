import React from 'react'
import { mount } from 'enzyme'
import { Description } from 'components'

describe('Description', () => {
  it('should render correctly', () => {
    const wrapper = mount(<Description title="title" />)
    expect(wrapper).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })
  
  it('should render react-node on title', () => {
    let wrapper = mount(<Description title={<p>p</p>} />)
    expect(wrapper.find('p').length).not.toBe(0)
  
    wrapper = mount(<Description title={<h1>p</h1>} />)
    expect(wrapper.find('h1').length).not.toBe(0)
  })
  
  it('should render react-node on content', () => {
    let wrapper = mount(<Description content={<p>p</p>} />)
    expect(wrapper.find('p').length).not.toBe(0)
    
    wrapper = mount(<Description content={<h1>p</h1>} />)
    expect(wrapper.find('h1').length).not.toBe(0)
  })
})
