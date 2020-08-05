import React from 'react'
import { mount, render } from 'enzyme'
import { Tag } from 'components'

describe('Tag', () => {
  it('should render correctly', () => {
    const wrapper = mount(<Tag>tag</Tag>)
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should work with colors', () => {
    const wrapper = render(
      <div>
        <Tag color="success">success</Tag>
        <Tag color="secondary">secondary</Tag>
        <Tag color="error">error</Tag>
        <Tag color="dark">dark</Tag>
      </div>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should work with invert', () => {
    const wrapper = render(
      <Tag color="success" invert>
        success
      </Tag>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should work when child is null', () => {
    const wrapper = mount(<Tag />)
    expect(() => wrapper.unmount()).not.toThrow()
  })
})
