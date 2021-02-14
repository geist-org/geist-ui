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

  it('should render correctly with clearable option', () => {
    const wrapper = mount(
      <Select multiple initialValue={['1']}>
        <Select.Option value="1">1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
      </Select>,
    )
    expect(wrapper.find('.clear-icon').length).toBe(1)
  })

  it('should render correctly without clearable option', () => {
    const wrapper = mount(
      <Select multiple clearable={false} initialValue={['1']}>
        <Select.Option value="1">1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
      </Select>,
    )
    expect(wrapper.find('.clear-icon').length).toBe(0)
  })

  it('should render value with initial-value', () => {
    const wrapper = mount(
      <Select initialValue={['1', '2']} multiple>
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

  it('should trigger events when option changed', async () => {
    let value = ''
    const changeHandler = jest.fn().mockImplementation(val => (value = val))
    const wrapper = mount(
      <Select onChange={changeHandler} multiple>
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

    wrapper.find('.select-dropdown').find('.option').at(0).simulate('click', nativeEvent)
    await updateWrapper(wrapper, 350)
    expect(Array.isArray(value)).toBeTruthy()
    expect(value.includes('1')).not.toBeTruthy()
    changeHandler.mockRestore()
  })
})

it('should trigger event correctly when clicked', async () => {
  const changeHandler = jest.fn()
  const wrapper = mount(
    <Select onChange={changeHandler} multiple initialValue={['1']}>
      <Select.Option value="1">1</Select.Option>
      <Select.Option value="2">Option 2</Select.Option>
    </Select>,
  )
  expect(wrapper.find('.clear-icon').length).toBe(1)
  wrapper.find('.clear-icon').simulate('click', nativeEvent)
  await updateWrapper(wrapper, 350)
  expect(changeHandler).toHaveBeenCalled()
  expect(wrapper.find('.clear-icon').length).toBe(0)
})
