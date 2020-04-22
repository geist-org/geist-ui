import React from 'react'
import { mount } from 'enzyme'
import { Note } from 'components'
import { updateWrapper } from 'tests/utils'

describe('Note', () => {
  it('should render correctly', () => {
    const wrapper = mount(<Note>note</Note>)
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })
  
  it('should work with different types', () => {
    const wrapper = mount(
      <div>
        <Note type="secondary">secondary</Note>
        <Note type="success">success</Note>
        <Note type="warning">warning</Note>
        <Note type="error">error</Note>
      </div>
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })
  
  it('custom labels should be rendered', async () => {
    const wrapper = mount(<Note label={false}>note</Note>)
    expect(wrapper.find('.label').length).toBe(0)
    
    wrapper.setProps({ label: 'test' })
    await updateWrapper(wrapper)
    expect(wrapper.find('.label').text().toLowerCase())
      .toContain('test')
  })
  
  it('should work with different styles', () => {
    const wrapper = mount(
      <div>
        <Note type="secondary" small>secondary</Note>
        <Note type="success" filled>success</Note>
        <Note filled>warning</Note>
        <Note filled small>error</Note>
      </div>
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })
})
