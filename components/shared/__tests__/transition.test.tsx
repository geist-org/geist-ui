import React from 'react'
import { mount } from 'enzyme'
import CSSTransition from '../css-transition'
import { updateWrapper } from 'tests/utils'

describe('CSSTransition', () => {
  it('should render correctly', () => {
    const wrapper = mount(<CSSTransition visible><span>test</span></CSSTransition>)
    expect(wrapper.text()).toContain('test')
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })
  
  it('should work correctly with time props', async () => {
    const wrapper = mount(
      <CSSTransition enterTime={300} leaveTime={300}>
        <span id="test">test</span>
      </CSSTransition>
    )
    expect(wrapper.find('.transition-enter-active').length).toBe(0)
  
    wrapper.setProps({ visible: true })
    await updateWrapper(wrapper, 310)
    expect(wrapper.find('.transition-enter-active').length).not.toBe(0)
  
    wrapper.setProps({ visible: false })
    await updateWrapper(wrapper, 310)
    expect(wrapper.find('.transition-leave-active').length).not.toBe(0)
  })
  
  it('should clear css-transition classes after hidden', async () => {
    const wrapper = mount(<CSSTransition visible><span>test</span></CSSTransition>)
    // don't remove classes after shown
    await updateWrapper(wrapper, 60)
    expect(wrapper.find('.transition-enter-active').length).not.toBe(0)
  
    await updateWrapper(wrapper, 150)
    expect(wrapper.find('.transition-enter-active').length).not.toBe(0)
    
    // remove classes after hidden
    wrapper.setProps({ visible: false })
    await updateWrapper(wrapper, 60)
    expect(wrapper.find('.transition-leave-active').length).not.toBe(0)
  
    await updateWrapper(wrapper, 150)
    expect(wrapper.find('.transition-leave-active').length).toBe(0)
    expect(wrapper.find('.transition-enter-active').length).toBe(0)
  })
  
  it('custom class names should be rendered', async () => {
    const wrapper = mount(
      <CSSTransition name="test">
        <span id="test">test</span>
      </CSSTransition>
    )
  
    expect(wrapper.find('.test-enter-active').length).toBe(0)
  
    wrapper.setProps({ visible: true })
    await updateWrapper(wrapper, 60)
    expect(wrapper.find('.test-enter-active').length).not.toBe(0)
  
    wrapper.setProps({ visible: false })
    await updateWrapper(wrapper, 60)
    expect(wrapper.find('.test-leave-active').length).not.toBe(0)
  })
})
