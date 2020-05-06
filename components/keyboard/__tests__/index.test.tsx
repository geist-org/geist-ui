import React from 'react'
import { mount, render } from 'enzyme'
import { Keyboard } from 'components'

describe('Keyboard', () => {
  it('should render correctly', () => {
    const wrapper = mount(<Keyboard>F</Keyboard>)

    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should work with modifiers', () => {
    const wrapper = mount(
      <div>
        <Keyboard command>F</Keyboard>
        <Keyboard shift>F</Keyboard>
        <Keyboard option>F</Keyboard>
        <Keyboard ctrl>F</Keyboard>
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should work with small size', () => {
    const wrapper = render(<Keyboard small>F</Keyboard>)
    expect(wrapper).toMatchSnapshot()
  })
})
