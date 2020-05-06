import React from 'react'
import { mount, render } from 'enzyme'
import { Display } from 'components'

describe('Display', () => {
  it('should render correctly', () => {
    const wrapper = mount(<Display caption="caption">display</Display>)
    expect(wrapper).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should support react-node', () => {
    const wrapper = mount(<Display caption={<h1>h1</h1>}>display</Display>)
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('h1').length).not.toBe(0)
  })

  it('should work with shadow and width', () => {
    const wrapper = render(
      <div>
        <Display caption={<h1>h1</h1>} shadow>
          display
        </Display>
        <Display caption={<h1>h1</h1>} width="50px">
          display
        </Display>
      </div>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
