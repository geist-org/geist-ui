import React from 'react'
import { mount, shallow } from 'enzyme'
import { Input } from 'components'
import { nativeEvent } from 'tests/utils'

describe('InputPassword', () => {
  it('should render correctly', () => {
    const wrapper = mount(<Input.Password />)
    const el = wrapper.find('input').getDOMNode() as HTMLInputElement
    expect(el.type).toEqual('password')
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should toggle input type', () => {
    const wrapper = mount(<Input.Password />)
    wrapper.find('.input-icon').simulate('click', nativeEvent)
    const el = wrapper.find('input').getDOMNode() as HTMLInputElement
    expect(el.type).toEqual('text')
  })

  it('should hide toggle icon', () => {
    const wrapper = mount(<Input.Password hideToggle />)
    expect(wrapper.find('.input-icon').length).toBe(0)
  })

  it('should be pass all native scale props', () => {
    const width = 'calc(100% - 10px)'
    const height = Math.random().toString(16).slice(-8)
    const wrapper = shallow(<Input.Password w={width} h={height} />)
    const html = wrapper.html()
    expect(html).toContain(width)
    expect(html).toContain(height)
  })
})
