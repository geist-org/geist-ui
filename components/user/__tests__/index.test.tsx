import React from 'react'
import { mount, render } from 'enzyme'
import { User } from 'components'

describe(' User', () => {
  it('should render correctly', () => {
    const wrapper = mount(<User name="witt" />)
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should support image and text', () => {
    const wrapper = render(
      <div>
        <User name="witt" text="witt" />
        <User name="witt" src="https://unix.bio/assets/avatar.png" />
      </div>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should render description correctly', () => {
    const wrapper = mount(<User name="witt">description</User>)
    expect(wrapper.text().toLowerCase()).toContain('description')
  })

  it('should render link on user.link', () => {
    const wrapper = mount(
      <User name="witt">
        <User.Link href="https://twitter.com/echo_witt">twitter</User.Link>
      </User>,
    )
    const link = wrapper.find('a')
    expect(link.length).not.toBe(0)
  })

  it('should pass alt attribute', () => {
    const wrapper = mount(
      <User name="witt" src="https://unix.bio/assets/avatar.png" altText="witt"/>
    )
    expect(wrapper.find('img').prop('alt')).toEqual('witt')
  })
})
