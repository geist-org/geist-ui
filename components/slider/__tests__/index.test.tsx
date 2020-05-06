import React from 'react'
import { mount } from 'enzyme'
import { Slider } from 'components'
import { nativeEvent, updateWrapper } from 'tests/utils'
import { act } from 'react-dom/test-utils'

const triggerDrag = (el: HTMLElement, x = 0) => {
  window.Element.prototype.getBoundingClientRect = () =>
    ({
      width: 100,
      left: 0,
      right: 100,
      x: 0,
    } as DOMRect)
  const mousedown = new MouseEvent('mousedown')
  const mousemove = new MouseEvent('mousemove', {
    clientX: x,
  })
  const mouseup = new MouseEvent('mouseup')
  el.dispatchEvent(mousedown)
  window.dispatchEvent(mousemove)
  window.dispatchEvent(mouseup)
}

describe('Slider', () => {
  beforeAll(() => {
    window.Element.prototype.getBoundingClientRect = () =>
      ({
        x: 0,
        y: 0,
        width: 100,
        height: 10,
        top: 0,
        bottom: 10,
        left: 0,
        right: 100,
      } as DOMRect)
  })

  it('should render correctly', () => {
    const wrapper = mount(<Slider initialValue={20} />)
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should trigger events when click', async () => {
    let value = 0
    const changeHandler = jest.fn().mockImplementation((val) => (value = val))
    const wrapper = mount(<Slider initialValue={20} onChange={changeHandler} />)
    wrapper.find('.slider').simulate('click', {
      ...nativeEvent,
      clientX: 50,
    })
    await updateWrapper(wrapper, 350)
    expect(changeHandler).toHaveBeenCalled()
    expect(value).toEqual(50)
    changeHandler.mockRestore()
  })

  it('should trigger events when drag', async () => {
    let value = 0
    const changeHandler = jest.fn().mockImplementation((val) => (value = val))
    const wrapper = mount(<Slider initialValue={0} onChange={changeHandler} />)
    const dot = wrapper.find('.dot').getDOMNode() as HTMLDivElement

    act(() => triggerDrag(dot, 50))
    expect(changeHandler).toHaveBeenCalled()
    expect(value).toEqual(50)
    changeHandler.mockRestore()
  })

  it('should ignore events when disabled', async () => {
    let value = 0
    const changeHandler = jest.fn().mockImplementation((val) => (value = val))
    const wrapper = mount(<Slider initialValue={0} disabled onChange={changeHandler} />)
    const dot = wrapper.find('.dot').getDOMNode() as HTMLDivElement

    act(() => triggerDrag(dot, 50))
    expect(changeHandler).not.toHaveBeenCalled()
    expect(value).not.toEqual(50)

    wrapper.find('.slider').simulate('click', {
      ...nativeEvent,
      clientX: 50,
    })
    await updateWrapper(wrapper, 350)
    expect(changeHandler).not.toHaveBeenCalled()
    expect(value).not.toEqual(50)
    changeHandler.mockRestore()
  })

  it('should move unit length is step', async () => {
    let value = 0
    const changeHandler = jest.fn().mockImplementation((val) => (value = val))
    const wrapper = mount(<Slider step={10} onChange={changeHandler} />)
    const dot = wrapper.find('.dot').getDOMNode() as HTMLDivElement

    act(() => triggerDrag(dot, 6))
    expect(changeHandler).toHaveBeenCalled()
    expect(value).toEqual(10)
    changeHandler.mockRestore()
  })

  it('should return the specified when the limit is exceeded', () => {
    let value = 0
    const changeHandler = jest.fn().mockImplementation((val) => (value = val))
    const wrapper = mount(<Slider min={10} max={20} onChange={changeHandler} />)
    const dot = wrapper.find('.dot').getDOMNode() as HTMLDivElement

    act(() => triggerDrag(dot, -5))
    expect(changeHandler).toHaveBeenCalled()
    expect(value).toEqual(10)

    act(() => triggerDrag(dot, 101))
    expect(changeHandler).toHaveBeenCalled()
    expect(value).toEqual(20)

    changeHandler.mockRestore()
  })

  it('should render number in dot', () => {
    let wrapper = mount(<Slider initialValue={20} />)
    expect(wrapper.find('.dot').text()).toContain('20')

    wrapper = mount(<Slider value={50} />)
    expect(wrapper.find('.dot').text()).toContain('50')
  })

  it('should work with markers', () => {
    let wrapper = mount(<Slider step={10} showMarkers />)
    expect(wrapper.html()).toMatchSnapshot()

    wrapper = mount(<Slider step={20} showMarkers />)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
