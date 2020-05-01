import React from 'react'
import { mount } from 'enzyme'
import Backdrop from '../backdrop'
import { nativeEvent, updateWrapper } from 'tests/utils'

describe('Backdrop', () => {
  it('should render correctly', () => {
    const wrapper = mount(
      <Backdrop visible><span>test-value</span></Backdrop>
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })
  
  it('should be shown or hidden by prop', async () => {
    const wrapper = mount(
      <Backdrop><span>test-value</span></Backdrop>
    )
    expect(wrapper.find('.backdrop').length).toBe(0)
    wrapper.setProps({ visible: true })
    await updateWrapper(wrapper, 350)
    expect(wrapper.find('.backdrop').length).not.toBe(0)
  })
  
  it('background click events should be captured', () => {
    const handler = jest.fn()
    const wrapper = mount(
      <Backdrop onClick={handler} visible><span>test-value</span></Backdrop>
    )
    wrapper.find('.backdrop').simulate('click', nativeEvent)
    expect(handler).toHaveBeenCalled()
    handler.mockRestore()
  })
  
  it('should be no error when handler missing', () => {
    const wrapper = mount(
      <Backdrop visible><span>test-value</span></Backdrop>
    )
    wrapper.find('.backdrop').simulate('click', nativeEvent)
    expect(() => wrapper.unmount()).not.toThrow()
  })
  
  it('should be prevent event from the container', () => {
    const handler = jest.fn()
    const wrapper = mount(
      <Backdrop onClick={handler} visible><span>test-value</span></Backdrop>
    )
    wrapper.find('.content').simulate('click', nativeEvent)
    wrapper.find('.offset').simulate('click', nativeEvent)
    expect(handler).not.toHaveBeenCalled()
    handler.mockRestore()
  })
  
  it('content should be offset', () => {
    const wrapper = mount(
      <Backdrop visible><span>test-value</span></Backdrop>
    )
    const notOffset = wrapper.html()
    expect(wrapper.html()).toMatchSnapshot()
  
    wrapper.setProps({ offsetY: '100' })
    expect(wrapper.html()).toMatchSnapshot()
    expect(notOffset).not.toEqual(wrapper.html())
  })
})
