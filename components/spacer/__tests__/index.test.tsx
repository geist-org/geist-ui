import React from 'react'
import { mount } from 'enzyme'
import { Spacer } from 'components'

describe('Spacer', () => {
  it('should render correctly', () => {
    const wrapper = mount(<Spacer />)
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should support x and y', () => {
    const wrapper = mount(
      <div>
        <Spacer w={5} />
        <Spacer w={15} />
        <Spacer h={15} />
        <Spacer h={2} />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should work with float', () => {
    const wrapper = mount(
      <div>
        <Spacer w={2.2} />
        <Spacer w={1.5} />
        <Spacer h={0.1} />
        <Spacer h={1.8} />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should work with inline mode', () => {
    const wrapper = mount(<Spacer inline />)
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })
})
