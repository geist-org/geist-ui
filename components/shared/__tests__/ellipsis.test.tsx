import React from 'react'
import { mount } from 'enzyme'
import Ellipsis from '../ellipsis'

describe('Ellipsis', () => {
  it('should render correctly', () => {
    const wrapper = mount(
      <div style={{ width: '1px' }}>
        <Ellipsis height="10px">text</Ellipsis>
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })
})
