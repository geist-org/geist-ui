import React from 'react'
import { mount } from 'enzyme'
import { Progress } from 'components'

describe('Progress', () => {
  it('should render correctly', () => {
    const wrapper = mount(<Progress value={59} />)
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })
  
  it('should work with different types', () => {
    const wrapper = mount(
      <div>
        <Progress value={59} type="secondary" />
        <Progress value={21} type="success" />
        <Progress value={2} type="warning" />
        <Progress value={1} type="error" />
      </div>
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })
  
  it('should show different progress by maximum', () => {
    const wrapper = mount(
      <div>
        <Progress value={59} max={60} />
        <Progress value={21} max={50} />
      </div>
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })
  
  it('should fixed', () => {
    const wrapper = mount(
      <div>
        <Progress value={59} fixedTop />
        <Progress value={21} fixedBottom />
      </div>
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })
  
  it('should be render background-color with color prop', () => {
    const colors = {
      20: '#ccc',
      100: '#111',
    }
    const wrapper = mount(<Progress value={59} colors={colors} />)
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })
  
  it('should be ignore wrong colors', () => {
    const colors = {
      'qq': '#ccc',
      10: '#111',
    }
    const wrapper = mount(<Progress value={59} colors={colors} />)
    expect(() => wrapper.unmount()).not.toThrow()
  })
})
