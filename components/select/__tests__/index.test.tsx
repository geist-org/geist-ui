import React from 'react'
import { mount, render } from 'enzyme'
import { Select } from 'components'
import { nativeEvent, updateWrapper } from 'tests/utils'

describe('Select', () => {
  it('should render correctly', () => {
    const wrapper = mount(
      <div>
        <Select />
        <Select size="mini" />
        <Select size="small" />
        <Select size="large" />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should work correctly with labels', () => {
    const wrapper = mount(
      <Select>
        <Select.Option label>1</Select.Option>
        <Select.Option divider>1</Select.Option>
        <Select.Option value="1">1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
      </Select>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should work with different icons', () => {
    const MockIcon = () => <span>icon</span>
    const pure = render(<Select pure />)
    expect(pure).toMatchSnapshot()

    const icon = render(<Select icon={MockIcon} />)
    expect(icon).toMatchSnapshot()
  })

  it('should render value with initial-value', () => {
    const wrapper = mount(
      <Select initialValue="2">
        <Select.Option value="1">1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
      </Select>,
    )
    expect(wrapper.find('.value').text()).toContain('Option 2')
  })

  it('should trigger events when option changed', async () => {
    let value = ''
    const changeHandler = jest.fn().mockImplementation(val => (value = val))
    const wrapper = mount(
      <Select onChange={changeHandler}>
        <Select.Option value="1">1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
      </Select>,
    )
    wrapper.find('.select').simulate('click', nativeEvent)
    wrapper.find('.select-dropdown').find('.option').at(0).simulate('click', nativeEvent)
    await updateWrapper(wrapper, 350)
    expect(changeHandler).toHaveBeenCalled()
    expect(value).toEqual('1')
    changeHandler.mockRestore()
  })

  it('should ignore events when disabled', async () => {
    const changeHandler = jest.fn()
    const wrapper = mount(
      <Select onChange={changeHandler} disabled>
        <Select.Option value="1">1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
      </Select>,
    )
    wrapper.find('.select').simulate('click', nativeEvent)
    expect(wrapper.find('.select-dropdown').length).toBe(0)
    changeHandler.mockRestore()
  })

  it('should ignore option when option disabled', async () => {
    let value = ''
    const changeHandler = jest.fn().mockImplementation(val => (value = val))
    const wrapper = mount(
      <Select onChange={changeHandler}>
        <Select.Option value="1">1</Select.Option>
        <Select.Option value="2" disabled>
          Option 2
        </Select.Option>
      </Select>,
    )
    wrapper.find('.select').simulate('click', nativeEvent)
    wrapper.find('.select-dropdown').find('.option').at(1).simulate('click', nativeEvent)
    await updateWrapper(wrapper, 350)
    expect(changeHandler).not.toHaveBeenCalled()
    expect(value).not.toEqual('2')
    changeHandler.mockRestore()
  })

  it('should be change when value changed', async () => {
    const wrapper = mount(
      <Select>
        <Select.Option value="1">Option 1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
      </Select>,
    )

    wrapper.setProps({ value: '2' })
    await updateWrapper(wrapper, 300)
    expect(wrapper.find('.value').text()).toContain('Option 2')

    wrapper.setProps({ value: '1' })
    await updateWrapper(wrapper, 300)
    expect(wrapper.find('.value').text()).toContain('Option 1')
  })

  it('should be wraning when ident value missing', () => {
    let errorMessage = ''
    const errorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(msg => (errorMessage = msg))
    const SelectOption = Select.Option as any
    const wrapper = mount(
      <Select>
        <SelectOption>1</SelectOption>
      </Select>,
    )
    wrapper.find('.select').simulate('click', nativeEvent)

    expect(errorMessage).toContain('required')
    errorSpy.mockRestore()
  })
})
