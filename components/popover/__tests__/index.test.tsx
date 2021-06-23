import React from 'react'
import { mount, ReactWrapper } from 'enzyme'
import { Popover } from 'components'
import { nativeEvent, updateWrapper } from 'tests/utils'

const expectPopoverIsShow = (wrapper: ReactWrapper) => {
  expect(wrapper.find('.inner').length).not.toBe(0)
}

const expectPopoverIsHidden = (wrapper: ReactWrapper) => {
  expect(wrapper.find('.inner').length).toBe(0)
}

describe('Popover', () => {
  it('should render correctly', async () => {
    const wrapper = mount(
      <Popover content="test">
        <div />
      </Popover>,
    )
    expectPopoverIsHidden(wrapper)

    wrapper.find('.tooltip').simulate('click', nativeEvent)
    await updateWrapper(wrapper, 350)
    expectPopoverIsShow(wrapper)

    wrapper.find('.tooltip').simulate('click', nativeEvent)
    await updateWrapper(wrapper, 350)
    expectPopoverIsHidden(wrapper)

    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should work correctly with props', async () => {
    const handler = jest.fn()
    const Demos: React.FC<{ visible?: boolean }> = ({ visible }) => {
      return (
        <Popover visible={visible} onVisibleChange={handler} content="test">
          <div />
        </Popover>
      )
    }
    const wrapper = mount(<Demos />)
    expectPopoverIsHidden(wrapper)

    wrapper.setProps({ visible: true })
    await updateWrapper(wrapper, 350)
    expectPopoverIsShow(wrapper)
    expect(handler).toBeCalled()

    wrapper.setProps({ visible: false })
    await updateWrapper(wrapper, 350)
    expectPopoverIsHidden(wrapper)

    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should render react-node', async () => {
    const wrapper = mount(
      <Popover content={<p id="test">custom-content</p>}>
        <div />
      </Popover>,
    )
    wrapper.find('.tooltip').simulate('click', nativeEvent)
    await updateWrapper(wrapper, 350)
    expectPopoverIsShow(wrapper)
    expect(wrapper.html()).toMatchSnapshot()

    const testNode = wrapper.find('#test')
    expect(testNode.length).not.toBe(0)
    expect(testNode.text()).toContain('custom-content')
  })

  it('should work with different triggers', async () => {
    const wrapper = mount(
      <Popover content="test" trigger="hover">
        <div />
      </Popover>,
    )
    wrapper.find('.tooltip').simulate('mouseEnter')
    await updateWrapper(wrapper, 350)
    expectPopoverIsShow(wrapper)
  })

  it('should work with different placement', async () => {
    const wrapper = mount(
      <Popover content="test" placement="topEnd">
        <div />
      </Popover>,
    )
    wrapper.find('.tooltip').simulate('click', nativeEvent)
    await updateWrapper(wrapper, 350)
    expectPopoverIsShow(wrapper)
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should be render each popover item', async () => {
    const content = () => (
      <div>
        <Popover.Item title>
          <span>settings</span>
        </Popover.Item>
        <Popover.Item line />
        <Popover.Item>
          <span>Command-Line</span>
        </Popover.Item>
      </div>
    )
    const wrapper = mount(
      <Popover content={content}>
        <div />
      </Popover>,
    )
    wrapper.find('.tooltip').simulate('click', nativeEvent)
    await updateWrapper(wrapper, 350)
    expectPopoverIsShow(wrapper)

    const title = wrapper.find('.inner').find('.title')
    const line = wrapper.find('.inner').find('.line')
    expect(title.text()).toContain('settings')
    expect(line.length).not.toBe(0)
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should close popover when item clicked', async () => {
    const wrapper = mount(
      <Popover content="test">
        <Popover.Item id="item" />
      </Popover>,
    )
    expectPopoverIsHidden(wrapper)

    wrapper.find('.tooltip').simulate('click', nativeEvent)
    await updateWrapper(wrapper, 350)
    expectPopoverIsShow(wrapper)

    const item = wrapper.find('#item').at(0)

    item.simulate('click', nativeEvent)
    await updateWrapper(wrapper, 350)
    expectPopoverIsHidden(wrapper)
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should prevent close popover when item clicked', async () => {
    const wrapper = mount(
      <Popover content="test">
        <Popover.Item id="item" disableAutoClose />
        <Popover.Item id="item2" />
      </Popover>,
    )
    expectPopoverIsHidden(wrapper)

    wrapper.find('.tooltip').simulate('click', nativeEvent)
    await updateWrapper(wrapper, 350)
    expectPopoverIsShow(wrapper)

    const item = wrapper.find('#item').at(0)
    const item2 = wrapper.find('#item2').at(0)

    item.simulate('click', nativeEvent)
    await updateWrapper(wrapper, 350)
    expectPopoverIsShow(wrapper)

    item2.simulate('click', nativeEvent)
    await updateWrapper(wrapper, 350)
    expectPopoverIsHidden(wrapper)
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should prevent all items', async () => {
    const wrapper = mount(
      <Popover content="test" disableItemsAutoClose>
        <Popover.Item id="item" />
        <Popover.Item id="item2" />
      </Popover>,
    )
    expectPopoverIsHidden(wrapper)

    wrapper.find('.tooltip').simulate('click', nativeEvent)
    await updateWrapper(wrapper, 350)
    expectPopoverIsShow(wrapper)

    const item = wrapper.find('#item').at(0)
    const item2 = wrapper.find('#item2').at(0)

    item.simulate('click', nativeEvent)
    await updateWrapper(wrapper, 350)
    expectPopoverIsShow(wrapper)
    item2.simulate('click', nativeEvent)
    await updateWrapper(wrapper, 350)
    expectPopoverIsShow(wrapper)
    expect(() => wrapper.unmount()).not.toThrow()
  })
})
