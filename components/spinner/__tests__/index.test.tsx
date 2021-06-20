import React from 'react'
import { mount } from 'enzyme'
import { Spinner } from 'components'

describe('Spacer', () => {
  it('should render correctly', () => {
    const wrapper = mount(<Spinner />)
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should work with different sizes', () => {
    const wrapper = mount(
      <div>
        <Spinner w="100px" />
        <Spinner h="100px" />
        <Spinner scale={2} />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })
})
