import React from 'react'
import { mount } from 'enzyme'
import { Breadcrumbs } from 'components'

describe('Breadcrumbs', () => {
  it('should render correctly', () => {
    const wrapper = mount(
      <Breadcrumbs>
        <Breadcrumbs.Item>test-1</Breadcrumbs.Item>
      </Breadcrumbs>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should redefined all separators', () => {
    const wrapper = mount(
      <Breadcrumbs separator="*">
        <Breadcrumbs.Item>test-1</Breadcrumbs.Item>
        <Breadcrumbs.Item>test-2</Breadcrumbs.Item>
      </Breadcrumbs>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.html()).toContain('*')
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('the specified separator should be redefined', () => {
    const wrapper = mount(
      <Breadcrumbs separator="*">
        <Breadcrumbs.Item>test-1</Breadcrumbs.Item>
        <Breadcrumbs.Separator>%</Breadcrumbs.Separator>
        <Breadcrumbs.Item>test-2</Breadcrumbs.Item>
      </Breadcrumbs>,
    )
    expect(wrapper.html()).toContain('%')
  })

  it('should render string when href missing', () => {
    let wrapper = mount(
      <Breadcrumbs>
        <Breadcrumbs.Item>test-1</Breadcrumbs.Item>
      </Breadcrumbs>,
    )
    let dom = wrapper.find('.breadcrums-item').at(0).getDOMNode()
    expect(dom.tagName).toEqual('SPAN')

    wrapper = mount(
      <Breadcrumbs>
        <Breadcrumbs.Item href="">test-1</Breadcrumbs.Item>
      </Breadcrumbs>,
    )
    dom = wrapper.find('.breadcrums-item').at(0).getDOMNode()
    expect(dom.tagName).toEqual('A')

    wrapper = mount(
      <Breadcrumbs>
        <Breadcrumbs.Item nextLink>test-1</Breadcrumbs.Item>
      </Breadcrumbs>,
    )
    dom = wrapper.find('.breadcrums-item').at(0).getDOMNode()
    expect(dom.tagName).toEqual('A')
  })

  it('should trigger click event', () => {
    const handler = jest.fn()
    const wrapper = mount(
      <Breadcrumbs>
        <Breadcrumbs.Item onClick={handler}>test-1</Breadcrumbs.Item>
      </Breadcrumbs>,
    )
    wrapper.find('.breadcrums-item').at(0).simulate('click')
    expect(handler).toHaveBeenCalled()
  })
})
