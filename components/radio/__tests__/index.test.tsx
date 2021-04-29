import React from 'react'
import { mount } from 'enzyme'
import { Radio } from 'components'
import { nativeEvent } from 'tests/utils'

describe('Radio', () => {
  it('should render correctly', () => {
    const wrapper = mount(<Radio checked={false}>Option</Radio>)
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should work correctly with different sizes', () => {
    const wrapper = mount(
      <div>
        <Radio size="mini">mini</Radio>
        <Radio size="small">small</Radio>
        <Radio size="medium">medium</Radio>
        <Radio size="large">large</Radio>
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should render correctly with checked prop', () => {
    const wrapper = mount(<Radio>Option</Radio>)
    wrapper.setProps({ checked: false })
    let input = wrapper.find('input').at(0).getDOMNode() as HTMLInputElement
    expect(input.checked).toEqual(false)

    wrapper.setProps({ checked: true })
    input = wrapper.find('input').at(0).getDOMNode() as HTMLInputElement
    expect(input.checked).toEqual(true)
  })

  it('should trigger events when use alone', () => {
    const changeHandler = jest.fn()
    const wrapper = mount(<Radio onChange={changeHandler}>Option</Radio>)
    wrapper
      .find('input')
      .at(0)
      .simulate('change', {
        ...nativeEvent,
        target: { checked: true },
      })
    expect(changeHandler).toHaveBeenCalled()
    changeHandler.mockRestore()
  })

  it('should ignore events when disabled', () => {
    const changeHandler = jest.fn()
    const wrapper = mount(
      <Radio onChange={changeHandler} disabled>
        Option
      </Radio>,
    )
    wrapper
      .find('input')
      .at(0)
      .simulate('change', {
        ...nativeEvent,
        target: { checked: true },
      })
    expect(changeHandler).not.toHaveBeenCalled()
    changeHandler.mockRestore()
  })

  it('should support react-node in description', () => {
    const wrapper = mount(
      <div>
        <Radio>Option</Radio>
        <Radio>
          Option 1<Radio.Desc>Description for Option1</Radio.Desc>
        </Radio>
        <Radio>
          Option 1
          <Radio.Desc>
            <b>Description</b> for Option1
          </Radio.Desc>
        </Radio>
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  // check ref is available: https://github.com/geist-org/react/issues/189
  it('should forward ref by default', () => {
    const ref = React.createRef<HTMLInputElement>()
    const wrapper = mount(<Radio ref={ref} />)
    expect(ref.current).not.toBeNull()
    expect(() => wrapper.unmount()).not.toThrow()
  })
})
