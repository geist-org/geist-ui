import React from 'react'
import { mount, render } from 'enzyme'
import { Dot } from 'components'

describe('Dot', () => {
  it('should render correctly', () => {
    const wrapper = mount(<Dot />)
    expect(wrapper).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })
  
  it('should supports types', () => {
    const wrapper = render(
      <div>
        <Dot type="success" />
        <Dot type="secondary" />
        <Dot type="warning" />
        <Dot type="error" />
      </div>
    )
    expect(wrapper).toMatchSnapshot()
  })
  
  it('should be render text', () => {
    const wrapper = mount(<Dot>test</Dot>)
    expect(wrapper.text()).toContain('test')
  })
})
