import React, { useRef } from 'react'
import { mount } from 'enzyme'
import Dropdown from '../dropdown'
import { nativeEvent, updateWrapper } from 'tests/utils'
import { act } from 'react-dom/test-utils'

const simulateGlobalClick = () => {
  document.body.dispatchEvent(
    new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    }),
  )
}

describe('Dropdown', () => {
  beforeAll(() => {
    window.Element.prototype.getBoundingClientRect = () => ({
      width: 100,
      left: 0,
      right: 100,
      top: 0,
      bottom: 100,
      height: 100,
      x: 0,
    } as DOMRect)
  })
  
  it('should render correctly', async () => {
    const Mock: React.FC<{ visible?: boolean }> = ({ visible = false }) => {
      const ref = useRef<HTMLDivElement>(null)
      return (
        <div ref={ref}>
          <Dropdown parent={ref} visible={visible}>
            <span>test-value</span>
          </Dropdown>
        </div>
      )
    }
    const wrapper = mount(<Mock />)
    wrapper.setProps({ visible: true })
    await updateWrapper(wrapper, 300)
  
    expect(wrapper.find('.dropdown').html()).toContain('test-value')
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })
  
  it('should be work without parent', () => {
    const wrapper = mount(
      <Dropdown visible>
        <span>test-value</span>
      </Dropdown>
    )
    
    expect(() => wrapper.unmount()).not.toThrow()
  })
  
  it('events should be prevented', () => {
    const handler = jest.fn()
    const Mock: React.FC<{}> = () => {
      const ref = useRef<HTMLDivElement>(null)
      return (
        <div ref={ref} onClick={handler}>
          <Dropdown parent={ref} visible>
            <span>test-value</span>
          </Dropdown>
        </div>
      )
    }
    const wrapper = mount(<Mock />)
    wrapper.find('.dropdown').simulate('click', nativeEvent)
    
    expect(handler).not.toHaveBeenCalled()
    expect(() => wrapper.unmount()).not.toThrow()
    handler.mockRestore()
  })
  
  it('should trigger rect update', async () => {
    let dynamicTopMock = 100, calledTimes = 0
    window.Element.prototype.getBoundingClientRect = () => {
      calledTimes ++
      return {
        width: 100,
        left: 0,
        right: 100,
        top: 0,
        bottom: dynamicTopMock,
        height: 100,
        x: 0,
      } as DOMRect
    }
    const Mock: React.FC<{}> = () => {
      const ref = useRef<HTMLDivElement>(null)
      return (
        <div ref={ref}>
          <Dropdown parent={ref} visible>
            <span>test-value</span>
          </Dropdown>
        </div>
      )
    }
    const wrapper = mount(<Mock />)
    expect(calledTimes).toBe(1)

    // Do not render if position is not updated
    act(() => simulateGlobalClick())
    expect(calledTimes).toBe(2)
    await updateWrapper(wrapper, 50)

    // Trigger position diff first, then trigger the update
    // Get Rect twice total
    act(() => {
      dynamicTopMock++
      simulateGlobalClick()
    })
    expect(calledTimes).toBeGreaterThanOrEqual(4)

    act(() => {
      dynamicTopMock++
      window.dispatchEvent(new Event('resize'))
    })
    expect(calledTimes).toBeGreaterThanOrEqual(5)

    expect(() => wrapper.unmount()).not.toThrow()
  })
  
  it('should tigger rect update when mouseenter', () => {
    let calledTimes = 0
    window.Element.prototype.getBoundingClientRect = () => {
      calledTimes ++
      return {
        width: 100,
        left: 0,
        right: 100,
        top: 0,
        bottom: 100,
        height: 100,
        x: 0,
      } as DOMRect
    }
    const Mock: React.FC<{}> = () => {
      const ref = useRef<HTMLDivElement>(null)
      return (
        <div ref={ref} id="parent">
          <Dropdown parent={ref} visible>
            <span>test-value</span>
          </Dropdown>
        </div>
      )
    }
    const wrapper = mount(<Mock />)
    expect(calledTimes).toBe(1)
  
    // MouseEnter event is monitored by native API, the simulate can not trigger it.
    const parent = wrapper.find('#parent').getDOMNode() as HTMLDivElement
    act(() => {
      parent.dispatchEvent(new Event('mouseenter'))
    })
    expect(calledTimes).toBe(2)
    
    expect(() => wrapper.unmount()).not.toThrow()
  })
})
