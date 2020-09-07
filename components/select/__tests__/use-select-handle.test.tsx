import React, { useEffect } from 'react'
import { mount } from 'enzyme'
import { Select } from 'components'
import { updateWrapper } from 'tests/utils'

describe('useSelectHandle', () => {
  it('should follow change with use-imperative-select', async () => {
    const MockSelect: React.FC<{ value?: string | string[] }> = ({ value }) => {
      const { setValue, ref } = Select.useSelectHandle()
      useEffect(() => {
        if (value !== undefined) setValue(value)
      }, [value])
      return (
        <Select ref={ref}>
          <Select.Option value="1">Option 1</Select.Option>
          <Select.Option value="2">Option 2</Select.Option>
        </Select>
      )
    }

    const wrapper = mount(<MockSelect />)
    wrapper.setProps({ value: '1' })
    await updateWrapper(wrapper, 300)
    expect(wrapper.find('.value').text()).toContain('Option 1')

    wrapper.setProps({ value: '2' })
    await updateWrapper(wrapper, 500)
    expect(wrapper.find('.value').text()).toContain('Option 2')
  })
})

describe('useSelectHandle', () => {
  it('should follow change with use-imperative-select', async () => {
    let log = ''
    jest.spyOn(console, 'log').mockImplementation(msg => (log = msg))
    const MockSelect: React.FC<{ value?: string | string[] }> = ({ value }) => {
      const { getValue, ref } = Select.useSelectHandle()
      useEffect(() => {
        setTimeout(() => console.log(getValue()), 0)
      }, [value])
      return (
        <Select ref={ref}>
          <Select.Option value="1">Option 1</Select.Option>
          <Select.Option value="2">Option 2</Select.Option>
          <Select.Option value="">Option null</Select.Option>
        </Select>
      )
    }

    const wrapper = mount(<MockSelect />)
    await updateWrapper(wrapper, 300)
    expect(log).toEqual('')
  })
})

describe('getValue', () => {
  it('should get current value', async () => {
    let log = ''
    jest.spyOn(console, 'log').mockImplementation(msg => (log = msg))
    const MockSelect: React.FC<{ value?: string | string[] }> = ({ value }) => {
      const { setValue, getValue, ref } = Select.useSelectHandle()
      useEffect(() => {
        if (value !== undefined) setValue(value)
        setTimeout(() => console.log(getValue()), 0)
      }, [value])
      return (
        <Select ref={ref}>
          <Select.Option value="1">Option 1</Select.Option>
          <Select.Option value="2">Option 2</Select.Option>
        </Select>
      )
    }

    const wrapper = mount(<MockSelect />)
    wrapper.setProps({ value: '1' })
    await updateWrapper(wrapper, 500)
    expect(log).toEqual('1')
    wrapper.setProps({ value: '2' })
    await updateWrapper(wrapper, 500)
    expect(log).toEqual('2')
  })
})
