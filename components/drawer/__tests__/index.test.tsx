import React from 'react'
import { mount } from 'enzyme'
import { Drawer } from 'components'
import { nativeEvent, updateWrapper } from 'tests/utils'
import { expectDrawerIsClosed, expectDrawerIsOpened } from './use-modal.test'
import userEvent from '@testing-library/user-event'

describe('Drawer', () => {
  it('should render correctly', () => {
    const wrapper = mount(
      <Drawer visible={true}>
        <Drawer.Title>Drawer</Drawer.Title>
        <Drawer.Subtitle>This is a drawer</Drawer.Subtitle>
        <Drawer.Content>
          <p>Some content contained within the drawer.</p>
        </Drawer.Content>
      </Drawer>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should work correctly with different placement', () => {
    const top = mount(
      <Drawer visible={true} placement="top">
        <p>Some content contained within the drawer.</p>
      </Drawer>,
    )
    expect(top.html()).toMatchSnapshot()
    expect(() => top.unmount()).not.toThrow()

    const right = mount(
      <Drawer visible={true} placement="right">
        <p>Some content contained within the drawer.</p>
      </Drawer>,
    )
    expect(right.html()).toMatchSnapshot()
    expect(() => right.unmount()).not.toThrow()

    const bottom = mount(
      <Drawer visible={true} placement="bottom">
        <p>Some content contained within the drawer.</p>
      </Drawer>,
    )
    expect(bottom.html()).toMatchSnapshot()
    expect(() => bottom.unmount()).not.toThrow()

    const left = mount(
      <Drawer visible={true} placement="left">
        <p>Some content contained within the drawer.</p>
      </Drawer>,
    )
    expect(left.html()).toMatchSnapshot()
    expect(() => left.unmount()).not.toThrow()
  })

  it('should trigger event when drawer changed', async () => {
    const closeHandler = jest.fn()
    const wrapper = mount(
      <Drawer onClose={closeHandler}>
        <Drawer.Title>Modal</Drawer.Title>
      </Drawer>,
    )
    expectDrawerIsClosed(wrapper)

    wrapper.setProps({ visible: true })
    await updateWrapper(wrapper, 350)
    expectDrawerIsOpened(wrapper)

    wrapper.find('.backdrop').simulate('click', nativeEvent)
    await updateWrapper(wrapper, 500)
    expectDrawerIsClosed(wrapper)
    expect(closeHandler).toHaveBeenCalled()
  })

  it('should disable backdrop event', async () => {
    const closeHandler = jest.fn()
    const wrapper = mount(
      <Drawer visible={true} disableBackdropClick onClose={closeHandler}>
        <Drawer.Title>Modal</Drawer.Title>
      </Drawer>,
    )
    wrapper.find('.backdrop').simulate('click', nativeEvent)
    await updateWrapper(wrapper, 500)
    expectDrawerIsOpened(wrapper)
    expect(closeHandler).not.toHaveBeenCalled()
  })

  it('customization should be supported', () => {
    const wrapper = mount(
      <Drawer visible={true} width="100px" wrapClassName="test-class">
        <Drawer.Title>Modal</Drawer.Title>
      </Drawer>,
    )
    const html = wrapper.find('.wrapper').html()
    expect(html).toMatchSnapshot()
    expect(wrapper.find('.wrapper').at(0).getDOMNode()).toHaveClass('test-class')
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('focus should only be switched within modal', async () => {
    const wrapper = mount(
      <Drawer visible={true} width="100px" wrapClassName="test-class">
        <button id="button" />
      </Drawer>,
    )
    const tabStart = wrapper.find('.hide-tab').at(0).getDOMNode()
    const tabEnd = wrapper.find('.hide-tab').at(1).getDOMNode()
    const button = wrapper.find('#button').at(0).getDOMNode()
    const focusTrap = wrapper.find('.wrapper').at(0).getDOMNode()

    expect(tabStart).toHaveFocus()
    userEvent.tab({ focusTrap })
    expect(button).toHaveFocus()
    userEvent.tab()
    expect(tabEnd).toHaveFocus()
    userEvent.tab()
    expect(tabStart).toHaveFocus()

    userEvent.tab({ shift: true, focusTrap })
    expect(tabEnd).toHaveFocus()
    userEvent.tab({ shift: true, focusTrap })
    expect(button).toHaveFocus()
    userEvent.tab({ shift: true, focusTrap })
    expect(tabStart).toHaveFocus()
  })

  it('should close drawer when keyboard event is triggered', async () => {
    const wrapper = mount(
      <Drawer visible={true}>
        <Drawer.Title>Drawer</Drawer.Title>
      </Drawer>,
    )
    expectDrawerIsOpened(wrapper)
    userEvent.keyboard('{esc}')
    await updateWrapper(wrapper, 500)
    expectDrawerIsClosed(wrapper)
  })

  it('should prevent close modal when keyboard is false', async () => {
    const wrapper = mount(
      <Drawer visible={true} keyboard={false}>
        <Drawer.Title>Drawer</Drawer.Title>
      </Drawer>,
    )
    expectDrawerIsOpened(wrapper)
    userEvent.keyboard('{esc}')
    await updateWrapper(wrapper, 500)
    expectDrawerIsOpened(wrapper)
  })
})
