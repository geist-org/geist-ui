import React from 'react'
import { mount } from 'enzyme'
import { Select } from 'components'
import { nativeEvent, updateWrapper } from 'tests/utils'

describe('Select Events', () => {
  let container: HTMLDivElement

  beforeEach(() => {
    container = document.createElement('div')
    document.body.append(container)
  })

  it('ref should be able to control the focus correctly', () => {
    const ref = React.createRef<HTMLDivElement>()
    const wrapper = mount(<Select ref={ref} />, { attachTo: container })
    const input = wrapper.find('input').at(0).getDOMNode()
    expect(document.activeElement?.outerHTML).not.toEqual(input.outerHTML)
    ref.current?.focus()
    expect(document.activeElement?.outerHTML).toEqual(input.outerHTML)
    ref.current?.blur()
    expect(document.activeElement?.outerHTML).not.toEqual(input.outerHTML)
  })

  it('should prevent mouse event when click background', async () => {
    let visible = false
    const handler = jest.fn().mockImplementation(next => {
      visible = next
    })
    const wrapper = mount(<Select onDropdownVisibleChange={handler} />, {
      attachTo: container,
    })
    expect(visible).toBe(false)
    expect(handler).not.toBeCalled()
    wrapper.find('.select').simulate('click', nativeEvent)
    await updateWrapper(wrapper, 300)
    expect(visible).toBe(true)
    expect(handler).toBeCalledTimes(1)

    wrapper.find('.dropdown').simulate('click', nativeEvent)
    await updateWrapper(wrapper, 300)
    expect(visible).toBe(true)
    expect(handler).toBeCalledTimes(1)
  })

  it('scrollTo should be work correctly', async () => {
    const ref = React.createRef<HTMLDivElement>()
    const handler = jest.fn()
    window.HTMLElement.prototype.scrollTo = jest.fn().mockImplementation(handler)
    const wrapper = mount(
      <Select ref={ref}>
        <Select.Option value="hello">world</Select.Option>
      </Select>,
      { attachTo: container },
    )
    wrapper.find('.select').simulate('click', nativeEvent)
    await updateWrapper(wrapper, 300)
    ref.current?.scrollTo({ top: 200 })
    expect(handler).toBeCalled()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  afterEach(() => {
    document.body.removeChild(container!)
  })
})
