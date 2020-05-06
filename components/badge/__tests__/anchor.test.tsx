import React from 'react'
import { mount } from 'enzyme'
import { Badge } from 'components'

describe('BadgeAnchor', () => {
  it('should render correctly', () => {
    const wrapper = mount(
      <Badge.Anchor>
        <Badge>test</Badge>
        <a>link</a>
      </Badge.Anchor>,
    )
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should be work without Badge', () => {
    const wrapper = mount(
      <Badge.Anchor>
        <a>link</a>
      </Badge.Anchor>,
    )
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should be support multiple position', () => {
    const wrapper = mount(
      <Badge.Anchor>
        <Badge>test</Badge>
        <button>btn</button>
      </Badge.Anchor>,
    )
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ placement: 'topLeft' })
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ placement: 'bottomRight' })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
