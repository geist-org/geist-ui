import React from 'react'
import { mount, ReactWrapper } from 'enzyme'
import { Toggle } from 'components'
import { nativeEvent, updateWrapper } from 'tests/utils'

const expectToggleIsChecked = (wrapper: ReactWrapper) => {
  expect(wrapper.find('.checked').length).not.toBe(0)
}

const expectToggleIsUnChecked = (wrapper: ReactWrapper) => {
  expect(wrapper.find('.checked').length).toBe(0)
}

describe('Toggle', () => {
  it('should render correctly', () => {
    const wrapper = mount(<Toggle />)
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should work with different sizes', () => {
    const wrapper = mount(
      <div>
        <Toggle size="mini" />
        <Toggle size="small" />
        <Toggle size="medium" />
        <Toggle size="large" />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should set toggle follow checked prop', async () => {
    const wrapper = mount(<Toggle initialChecked={true} />)
    expectToggleIsChecked(wrapper)

    wrapper.setProps({ checked: false })
    await updateWrapper(wrapper)
    expectToggleIsUnChecked(wrapper)

    wrapper.setProps({ checked: true })
    await updateWrapper(wrapper)
    expectToggleIsChecked(wrapper)
  })

  it('should trigger events when toggle changed', async () => {
    let checked = false
    const changeHandler = jest.fn().mockImplementation((e) => (checked = e.target.checked))
    const wrapper = mount(<Toggle onChange={changeHandler} />)

    wrapper.find('input').simulate('change', {
      ...nativeEvent,
      target: { checked: true },
    })
    await updateWrapper(wrapper)
    expectToggleIsChecked(wrapper)

    expect(changeHandler).toHaveBeenCalled()
    expect(checked).toEqual(true)
  })

  it('should ignore events when toggle disabled', async () => {
    const changeHandler = jest.fn()
    const wrapper = mount(<Toggle onChange={changeHandler} disabled />)

    wrapper.find('input').simulate('change', {
      ...nativeEvent,
      target: { checked: true },
    })
    await updateWrapper(wrapper)
    expectToggleIsUnChecked(wrapper)

    expect(changeHandler).not.toHaveBeenCalled()
  })
})
