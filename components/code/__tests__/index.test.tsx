import React from 'react'
import { mount, render } from 'enzyme'
import { Code } from '../../index'

describe('Code', () => {
  it('should render correctly', () => {
    const wrapper = mount(<Code>code</Code>)
    expect(() => wrapper.unmount()).not.toThrow()
  })
  
  it('should support block mode', () => {
    const wrapper = render(<Code block>code</Code>)
    expect(wrapper).toMatchSnapshot()
  })
  
  it('should repspond to changed by width', () => {
    const wrapper = render(<Code block width="50%">code</Code>)
    expect(wrapper).toMatchSnapshot()
  })
  
  it('should render pre element only in block mode', () => {
    const wrapper = mount(<Code>code</Code>)
    expect(wrapper.find('pre').length).toBe(0)
    wrapper.setProps({ block: true })
    expect(wrapper.find('pre').length).not.toBe(0)
  })
  
  it('should alert warning when use bash', () => {
    let errorMessage = ''
    const errorSpy = jest.spyOn(console, 'error')
      .mockImplementation(msg => errorMessage = msg)
    
    mount(<Code bash>code</Code>)
    expect(errorMessage.toLowerCase()).toContain('deprecated')
    errorSpy.mockRestore()
  })
  
  it('should alert warning when use darkBash', () => {
    let errorMessage = ''
    const errorSpy = jest.spyOn(console, 'error')
      .mockImplementation(msg => errorMessage = msg)
  
    mount(<Code darkBash>code</Code>)
    expect(errorMessage.toLowerCase()).toContain('deprecated')
    errorSpy.mockRestore()
  })
})
