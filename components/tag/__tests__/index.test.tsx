import React from 'react'
import { mount, render } from 'enzyme'
import { Tag } from 'components'

describe('Tag', () => {
  it('should render correctly', () => {
    const wrapper = mount(<Tag>tag</Tag>)
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should work with types', () => {
    const wrapper = render(
      <div>
        <Tag type="success">success</Tag>
        <Tag type="secondary">secondary</Tag>
        <Tag type="error">error</Tag>
        <Tag type="dark">dark</Tag>
      </div>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should work with invert', () => {
    const wrapper = render(
      <Tag type="success" invert>
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
