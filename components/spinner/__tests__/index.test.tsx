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
        <Spinner size="mini" />
        <Spinner size="small" />
        <Spinner size="medium" />
        <Spinner size="large" />
      </div>
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })
})
