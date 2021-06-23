import React from 'react'
import { mount, render } from 'enzyme'
import { Divider } from 'components'

describe('Divider', () => {
  it('should render correctly', () => {
    const wrapper = mount(<Divider />)
    expect(wrapper).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should work with w and h', () => {
    const wrapper = render(
      <div>
        <Divider w={3} />
        <Divider h={3} />
      </div>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should work with type', () => {
    const wrapper = render(
      <div>
        <Divider type="secondary" />
        <Divider type="warning" />
        <Divider type="dark" />
      </div>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should work with align and volume', () => {
    const wrapper = render(
      <div>
        <Divider align="start">start</Divider>
        <Divider align="left">left</Divider>
        <Divider align="end">end</Divider>
        <Divider align="start" h={2}>
          start
        </Divider>
      </div>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should support float', () => {
    const wrapper = mount(
      <div>
        <Divider w={1.1} h={2.5} />
        <Divider h={2.5} />
      </div>,
    )
    expect(wrapper).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })
})
