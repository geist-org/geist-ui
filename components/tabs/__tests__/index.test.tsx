import React from 'react'
import { mount } from 'enzyme'
import { Tabs } from 'components'
import { nativeEvent, updateWrapper } from 'tests/utils'

describe('Tabs', () => {
  it('should render correctly', () => {
    const wrapper = mount(
      <Tabs>
        <Tabs.Item label="label1" value="1">
          1
        </Tabs.Item>
        <Tabs.Item label="label2" value="2">
          2
        </Tabs.Item>
      </Tabs>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should work correctly with different styles', () => {
    const wrapper = mount(
      <Tabs hideDivider>
        <Tabs.Item label="label1" value="1">
          1
        </Tabs.Item>
      </Tabs>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should trigger events when tab changed', () => {
    let value = ''
    const changeHandler = jest.fn().mockImplementation(val => (value = val))
    const wrapper = mount(
      <Tabs initialValue="1" onChange={changeHandler}>
        <Tabs.Item label="label1" value="1">
          1
        </Tabs.Item>
        <Tabs.Item label="label2" value="2">
          2
        </Tabs.Item>
      </Tabs>,
    )

    wrapper.find('header').find('.tab').at(1).simulate('click', nativeEvent)
    expect(changeHandler).toHaveBeenCalled()
    expect(value).toBe('2')
  })

  it('should ignore events when tab disabled', () => {
    const changeHandler = jest.fn()
    const wrapper = mount(
      <Tabs initialValue="1" onChange={changeHandler}>
        <Tabs.Item label="label1" value="1">
          1
        </Tabs.Item>
        <Tabs.Item label="label2" value="2" disabled>
          2
        </Tabs.Item>
      </Tabs>,
    )

    wrapper.find('header').find('.tab').at(1).simulate('click', nativeEvent)
    expect(changeHandler).not.toHaveBeenCalled()
  })

  it('should be activate the specified tab', async () => {
    const wrapper = mount(
      <Tabs value="1">
        <Tabs.Item label="label1" value="1">
          test-1
        </Tabs.Item>
        <Tabs.Item label="label2" value="2">
          test-2
        </Tabs.Item>
      </Tabs>,
    )
    let active = wrapper.find('header').find('.active')
    expect(active.text()).toContain('label1')

    wrapper.setProps({ value: '2' })
    await updateWrapper(wrapper, 350)
    active = wrapper.find('header').find('.active')
    expect(active.text()).toContain('label2')
  })

  it('should re-render when items updated', () => {
    const Mock = ({ label = 'label1' }) => {
      return (
        <Tabs value="1">
          <Tabs.Item label={label} value="1">
            test-1
          </Tabs.Item>
          <Tabs.Item label="label-fixed" value="2">
            test-label-fixed
          </Tabs.Item>
        </Tabs>
      )
    }
    const wrapper = mount(<Mock />)
    let active = wrapper.find('header').find('.active')
    expect(active.text()).toContain('label1')

    wrapper.setProps({ label: 'label2' })
    active = wrapper.find('header').find('.active')
    expect(active.text()).toContain('label2')
    expect(() => wrapper.unmount()).not.toThrow()
  })
})
