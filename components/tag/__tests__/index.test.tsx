import { Tag } from 'components'
import { mount, render } from 'enzyme'
import React from 'react'
import { nativeEvent } from 'tests/utils'

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
        <Tag color="success">dark</Tag>
      </div>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should work with variants', () => {
    const wrapper = render(
      <div>
        <Tag variant="text">text</Tag>
        <Tag variant="solid">solid</Tag>
      </div>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should work with toggleable', () => {
    let wrapper = mount(
      <div>
        <Tag>tag</Tag>
      </div>,
    )
    wrapper.find('.tag').at(0).simulate('click', nativeEvent)
    expect(wrapper.find('.tag.active').length).toEqual(0)

    wrapper = mount(
      <div>
        <Tag toggleable>tag</Tag>
      </div>,
    )
    wrapper.find('.tag').at(0).simulate('click', nativeEvent)
    expect(wrapper.find('.tag.active').length).not.toEqual(0)
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.find('.tag').at(0).simulate('click', nativeEvent)
    expect(wrapper.find('.tag.active').length).toEqual(0)
  })

  it('should work when child is null', () => {
    const wrapper = mount(<Tag />)
    expect(() => wrapper.unmount()).not.toThrow()
  })
})
