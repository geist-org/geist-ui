import React, { useEffect, useState } from 'react'
import { nativeEvent } from 'tests/utils'
import { mount, ReactWrapper } from 'enzyme'
import { reduceStatus, defaultGetColor } from '../style'
import { Tabs } from 'components'
import { palette } from '../../styles/themes/default'
import { TabStatus, TabVarient } from 'components/utils/prop-types'

describe('Tabs', () => {
  it('should render correctly', () => {
    const wrapper = mount(
      <div>
        <Tabs>
          <Tabs.Item label="label1" value="1">
            1
          </Tabs.Item>
          <Tabs.Item label="label2" value="2">
            2
          </Tabs.Item>
        </Tabs>

        <Tabs varient="solid">
          <Tabs.Item label="label1" value="1">
            1
          </Tabs.Item>
          <Tabs.Item label="label2" value="2">
            2
          </Tabs.Item>
        </Tabs>
      </div>,
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

  it('should change style when hover header', () => {
    const wrapper = mount(
      <Tabs initialValue="1">
        <Tabs.Item label="label1" value="1">
          1
        </Tabs.Item>
        <Tabs.Item label="label2" value="2">
          2
        </Tabs.Item>
      </Tabs>,
    )
    wrapper.find('header').find('.nav').at(1).simulate('mouseEnter', nativeEvent)
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.find('header').find('.nav').at(1).simulate('mouseLeave', nativeEvent)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('can set tabs dynamically', () => {
    function App() {
      const [items, setItems] = useState([
        { label: 'label1', value: '1' },
        { label: 'label2', value: '2' },
      ])
      useEffect(() => {
        setItems([{ label: 'label11', value: '1' }])
      }, [])
      return (
        <Tabs initialValue="1">
          {items.map(({ label, value }) => {
            return (
              <Tabs.Item key={value} label={label} value={value}>
                {label}
              </Tabs.Item>
            )
          })}
        </Tabs>
      )
    }
    const wrapper = mount(<App />)
    const label = wrapper.find('header').find('.label').text()
    expect(label).toBe('label11')
    wrapper.unmount()
  })

  it('can be controlled', () => {
    const controlled = mount(
      <Tabs value="1">
        <Tabs.Item label="label1" value="1">
          1
        </Tabs.Item>
        <Tabs.Item label="label2" value="2">
          2
        </Tabs.Item>
      </Tabs>,
    )
    const uncontrolled = mount(
      <Tabs initialValue="1">
        <Tabs.Item label="label1" value="1">
          1
        </Tabs.Item>
        <Tabs.Item label="label2" value="2">
          2
        </Tabs.Item>
      </Tabs>,
    )
    uncontrolled.find('header').find('.tab').at(1).simulate('click', nativeEvent)
    controlled.find('header').find('.tab').at(1).simulate('click', nativeEvent)
    const getActiveLabel = (wrapper: ReactWrapper) =>
      wrapper
        .find('header')
        .findWhere(n => n.hasClass('active'))
        .find('.label')
        .childAt(0)
        .html()
    expect(getActiveLabel(uncontrolled)).toBe('label2')
    expect(getActiveLabel(controlled)).toBe('label1')
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

  it('should be able to update tab-item props', () => {
    function App() {
      const [label1, setLabel1] = useState('label1')
      useEffect(() => {
        setLabel1('label11')
      }, [])
      return (
        <Tabs value="1" showDivider={true}>
          <Tabs.Item label={label1} value="1">
            1
          </Tabs.Item>
          <Tabs.Item label="label2" value="2" disabled>
            2
          </Tabs.Item>
        </Tabs>
      )
    }
    const wrapper = mount(<App />)
    const label = wrapper
      .find('header')
      .findWhere(n => n.hasClass('active'))
      .find('.label')
      .childAt(0)
      .html()
    expect(label).toBe('label11')
  })
})

describe('useImperative', () => {
  it('should work with useImperative', () => {
    const { useTabsHandle } = Tabs
    let _getCurrentTab: Function = () => null
    function App() {
      const { ref, setCurrentTab, getCurrentTab } = useTabsHandle()
      _getCurrentTab = getCurrentTab
      useEffect(() => {
        setCurrentTab('2')
      }, [])
      return (
        <Tabs ref={ref}>
          <Tabs.Item label="label1" value="1">
            1
          </Tabs.Item>
          <Tabs.Item label="label2" value="2" disabled>
            2
          </Tabs.Item>
        </Tabs>
      )
    }
    mount(<App />)
    expect(_getCurrentTab()).toBe('2')
  })
})

describe('utils', () => {
  it('should cover a unreachable brach due to a ts bug', () => {
    expect(reduceStatus({})).toBe('default')
  })

  it('should return corrent colors with virant and status combination', () => {
    const status: TabStatus[] = ['disabled', 'active', 'hover', 'default']
    const varients: TabVarient[] = ['line', 'solid']
    const colors: any[] = []
    status.forEach(s => {
      varients.forEach(v => {
        colors.push(defaultGetColor(palette, v, s))
      })
    })
    expect(colors).toMatchSnapshot()
  })
})
