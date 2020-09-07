import React from 'react'
import { mount } from 'enzyme'
import { Select } from 'components'
import { nativeEvent, updateWrapper } from 'tests/utils'

describe('Select Multiple', () => {
  it('should render correctly', () => {
    const wrapper = mount(
      <Select multiple>
        <Select.Option value="1">1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
      </Select>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should ignore events when disabled', async () => {
    const changeHandler = jest.fn()
    const wrapper = mount(
      <Select onChange={changeHandler} multiple>
        <Select.Option value="1" disabled>
          1
        </Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
      </Select>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should render value with string default-value', () => {
    const wrapper = mount(
      <Select defaultValue="1" multiple>
        <Select.Option value="1">1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
      </Select>,
    )
    expect(wrapper.find('.option').length).toEqual(1)
  })

  it('should render value with array default-value', () => {
    const wrapper = mount(
      <Select defaultValue={['1', '2']} multiple>
        <Select.Option value="1">test-1</Select.Option>
        <Select.Option value="2">test-2</Select.Option>
        <Select.Option value="3">test-3</Select.Option>
      </Select>,
    )
    expect(wrapper.find('.option').length).toBeGreaterThan(1)
    const text = wrapper
      .find('.option')
      .map(item => item.text())
      .reduce((pre, current) => `${pre}${current}`, '')
    expect(text.includes('test-1')).toBeTruthy()
    expect(text.includes('test-2')).toBeTruthy()
    expect(text.includes('test-3')).not.toBeTruthy()
  })

  it('should trigger events when option select', async () => {
    let value = ''
    const changeHandler = jest.fn().mockImplementation(val => (value = val))
    const wrapper = mount(
      <Select onChange={changeHandler} multiple value={value}>
        <Select.Option value="1">1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
      </Select>,
    )
    wrapper.find('.select').simulate('click', nativeEvent)
    wrapper.find('.select-dropdown').find('.option').at(0).simulate('click', nativeEvent)
    await updateWrapper(wrapper, 350)
    expect(changeHandler).toHaveBeenCalled()
    expect(Array.isArray(value)).toBeTruthy()
    expect(value.includes('1')).toBeTruthy()
    changeHandler.mockRestore()
  })

  it('should trigger events when option unselect', async () => {
    let value = ['1']
    const changeHandler = jest.fn().mockImplementation(val => (value = val))
    const wrapper = mount(
      <Select onChange={changeHandler} multiple value={value}>
        <Select.Option value="1">1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
      </Select>,
    )
    wrapper.find('.select').simulate('click', nativeEvent)
    wrapper.find('.select-dropdown').find('.option').at(0).simulate('click', nativeEvent)
    await updateWrapper(wrapper, 350)
    expect(changeHandler).toHaveBeenCalled()
    expect(Array.isArray(value)).toBeTruthy()
    expect(value.includes('1')).not.toBeTruthy()
    changeHandler.mockRestore()
  })
})
