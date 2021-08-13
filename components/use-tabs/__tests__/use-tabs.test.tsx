import React, { useEffect } from 'react'
import { mount } from 'enzyme'
import { Tabs, useTabs } from 'components'
import { nativeEvent, updateWrapper } from 'tests/utils'

describe('UseTabs', () => {
  it('should follow changes with use-tabs', async () => {
    const MockTabs: React.FC<{ value?: string }> = ({ value }) => {
      const { setState, bindings } = useTabs('1')
      useEffect(() => {
        if (value) setState(value)
      }, [value])
      return (
        <Tabs {...bindings}>
          <Tabs.Item label="label1" value="1">
            1
          </Tabs.Item>
          <Tabs.Item label="label2" value="2">
            2
          </Tabs.Item>
        </Tabs>
      )
    }
    const wrapper = mount(<MockTabs />)
    let active = wrapper.find('header').find('.active')
    expect(active.text()).toContain('label1')

    wrapper.setProps({ value: '2' })
    await updateWrapper(wrapper, 350)
    active = wrapper.find('header').find('.active')
    expect(active.text()).toContain('label2')

    wrapper.find('header').find('.tab').at(0).simulate('click', nativeEvent)
    active = wrapper.find('header').find('.active')
    expect(active.text()).toContain('label1')
  })
})
