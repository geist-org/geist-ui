import { Textarea } from 'components'
import { mount } from 'enzyme'
import React from 'react'
import { nativeEvent } from 'tests/utils'

describe('Textarea', () => {
  it('should render correctly', () => {
    const wrapper = mount(<Textarea placeholder="placeholder" />)
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should work with different styles', () => {
    const wrapper = mount(
      <div>
        <Textarea color="primary" />
        <Textarea width="20%" />
        <Textarea minHeight="100px" />
        <Textarea variant="solid" />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should set textarea from value', () => {
    const wrapper = mount(<Textarea defaultValue="test-value" />)
    let el = wrapper.find('textarea').getDOMNode() as HTMLTextAreaElement
    expect(el.value).toEqual('test-value')

    wrapper.setProps({ value: 'test-value2' })
    el = wrapper.find('textarea').getDOMNode() as HTMLTextAreaElement
    expect(el.value).toEqual('test-value2')
  })

  it('should trigger events when textarea changed', () => {
    let value = ''
    const handler = jest.fn().mockImplementation(e => (value = e.target.value))
    const wrapper = mount(<Textarea onChange={handler} />)
    wrapper.find('textarea').simulate('change', { target: { value: 'test-value' } })
    expect(handler).toHaveBeenCalled()
    expect(value).toEqual('test-value')
    handler.mockRestore()
  })

  it('should ignore events when disabled or readonly', () => {
    const handler = jest.fn()
    const wrapper = mount(<Textarea onChange={handler} disabled />)
    wrapper.find('textarea').simulate('change', { target: { value: 'test-value' } })
    expect(handler).not.toHaveBeenCalled()

    wrapper.setProps({ disabled: false, readOnly: true })
    wrapper.find('textarea').simulate('change', { target: { value: 'test-value2' } })
    expect(handler).not.toHaveBeenCalled()
    handler.mockRestore()
  })

  it('should pass through blur event', () => {
    const blurHandler = jest.fn()
    const focusHandler = jest.fn()
    const wrapper = mount(<Textarea onBlur={blurHandler} onFocus={focusHandler} />)

    wrapper.find('textarea').simulate('focus', nativeEvent)
    expect(focusHandler).toHaveBeenCalled()

    wrapper.find('textarea').simulate('blur', nativeEvent)
    expect(blurHandler).toHaveBeenCalled()
  })

  it('should pass through onMouseOut event', () => {
    const onMouseOver = jest.fn()
    const onMouseOut = jest.fn()
    const wrapper = mount(<Textarea onMouseOver={onMouseOver} onMouseOut={onMouseOut} />)

    wrapper.find('textarea').simulate('mouseOver', nativeEvent)
    expect(onMouseOver).toHaveBeenCalled()

    wrapper.find('textarea').simulate('mouseOut', nativeEvent)
    expect(onMouseOut).toHaveBeenCalled()
  })

  it('should show the right character count', () => {
    const wrapper = mount(<Textarea counter defaultValue="foo" />)
    expect(wrapper.exists('.counter .separator')).toBeFalsy
    expect(wrapper.exists('.counter .limit')).toBeFalsy
    expect(wrapper.find('.counter .count').text()).toBe('3')
  })

  it("should limit and slice user's input if reaches the maxLength limit", () => {
    const onChange = jest.fn()
    const wrapper = mount(<Textarea counter maxLength={3} defaultValue="f" onChange={onChange} />)
    let changeEvent = { target: { value: 'fo' } }
    wrapper.find('textarea').simulate('change', changeEvent)
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining(changeEvent))
    changeEvent = { target: { value: 'foo' } }
    wrapper.find('textarea').simulate('change', changeEvent)
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining(changeEvent))
    changeEvent = { target: { value: 'fooo' } }
    wrapper.find('textarea').simulate('change', changeEvent)
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ target: { value: 'foo' } }))
  })

  it('should forward ref by default', () => {
    const ref = React.createRef<HTMLTextAreaElement>()
    const wrapper = mount(<Textarea ref={ref} />)
    expect(ref.current).not.toBeNull()
    expect(() => wrapper.unmount()).not.toThrow()
  })
})
