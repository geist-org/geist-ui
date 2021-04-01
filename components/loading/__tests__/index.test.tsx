import React from 'react'
import { mount } from 'enzyme'
import { Loading } from 'components'

describe('Loading', () => {
  it('should render correctly', () => {
    const wrapper = mount(<Loading />)
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).toMatchSnapshot()
  })

  it('should work with different types', () => {
    const wrapper = mount(
      <div>
        <Loading type="success" />
        <Loading type="secondary" />
        <Loading type="warning" />
        <Loading type="error" />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).toMatchSnapshot()
  })

  it('should work with different sizes', () => {
    const wrapper = mount(
      <div>
        <Loading size="mini" />
        <Loading size="small" />
        <Loading size="medium" />
        <Loading size="large" />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).toMatchSnapshot()
  })

  it('should work with custom styles', () => {
    const wrapper = mount(
      <div>
        <Loading color="#fff" />
        <Loading width="20%" />
        <Loading height="10px" />
        <Loading width="20px" height="50px" />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).toMatchSnapshot()
  })

  it('should work with children', () => {
    const wrapper = mount(<Loading>test-children</Loading>)
    expect(wrapper.find('.loading').text()).toContain('test-children')
  })
})
