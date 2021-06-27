import React from 'react'
import { mount } from 'enzyme'
import { KeyCode, Modal } from 'components'
import { nativeEvent, updateWrapper } from 'tests/utils'
import { expectModalIsClosed, expectModalIsOpened } from './use-modal.test'

describe('Modal', () => {
  it('should render correctly', () => {
    const wrapper = mount(
      <Modal visible={true}>
        <Modal.Title>Modal</Modal.Title>
        <Modal.Subtitle>This is a modal</Modal.Subtitle>
        <Modal.Content>
          <p>Some content contained within the modal.</p>
        </Modal.Content>
        <Modal.Action passive>Cancel</Modal.Action>
        <Modal.Action>Submit</Modal.Action>
      </Modal>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should trigger event when modal changed', async () => {
    const closeHandler = jest.fn()
    const wrapper = mount(
      <Modal onClose={closeHandler}>
        <Modal.Title>Modal</Modal.Title>
      </Modal>,
    )
    expectModalIsClosed(wrapper)

    wrapper.setProps({ visible: true })
    await updateWrapper(wrapper, 350)
    expectModalIsOpened(wrapper)

    wrapper.find('.backdrop').simulate('click', nativeEvent)
    await updateWrapper(wrapper, 500)
    expectModalIsClosed(wrapper)
    expect(closeHandler).toHaveBeenCalled()
  })

  it('should disable backdrop event', async () => {
    const closeHandler = jest.fn()
    const wrapper = mount(
      <Modal visible={true} disableBackdropClick onClose={closeHandler}>
        <Modal.Title>Modal</Modal.Title>
        <Modal.Action>Submit</Modal.Action>
      </Modal>,
    )
    wrapper.find('.backdrop').simulate('click', nativeEvent)
    await updateWrapper(wrapper, 500)
    expectModalIsOpened(wrapper)
    expect(closeHandler).not.toHaveBeenCalled()
  })

  it('should disable backdrop even if actions missing', async () => {
    const closeHandler = jest.fn()
    const wrapper = mount(
      <Modal visible={true} disableBackdropClick onClose={closeHandler}>
        <Modal.Title>Modal</Modal.Title>
      </Modal>,
    )
    wrapper.find('.backdrop').simulate('click', nativeEvent)
    await updateWrapper(wrapper, 500)
    expectModalIsOpened(wrapper)
    expect(closeHandler).not.toHaveBeenCalled()
  })

  it('should ignore event when action disabled', () => {
    const actions1 = jest.fn()
    const actions2 = jest.fn()
    const wrapper = mount(
      <Modal visible={true}>
        <Modal.Title>Modal</Modal.Title>
        <Modal.Action passive onClick={actions1}>
          Submit
        </Modal.Action>
        <Modal.Action disabled onClick={actions2}>
          Submit
        </Modal.Action>
      </Modal>,
    )
    wrapper.find('button').at(0).simulate('click', nativeEvent)
    wrapper.find('button').at(1).simulate('click', nativeEvent)

    expect(actions1).toHaveBeenCalled()
    expect(actions2).not.toHaveBeenCalled()
  })

  it('should be close modal through action event', async () => {
    const closeHandler = jest.fn()
    const wrapper = mount(
      <Modal visible={true} onClose={closeHandler}>
        <Modal.Title>Modal</Modal.Title>
        <Modal.Action passive onClick={e => e.close()}>
          Close
        </Modal.Action>
      </Modal>,
    )
    wrapper.find('button').at(0).simulate('click', nativeEvent)
    await updateWrapper(wrapper, 500)
    expectModalIsClosed(wrapper)
    expect(closeHandler).toHaveBeenCalled()
  })

  it('customization should be supported', () => {
    const wrapper = mount(
      <Modal visible={true} width="100px" wrapClassName="test-class">
        <Modal.Title>Modal</Modal.Title>
      </Modal>,
    )
    const html = wrapper.find('.wrapper').html()
    expect(html).toMatchSnapshot()
    expect(html).toContain('test-class')
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('focus should only be switched within modal', () => {
    const wrapper = mount(
      <Modal visible={true} width="100px" wrapClassName="test-class">
        <Modal.Title>Modal</Modal.Title>
      </Modal>,
    )
    const tabStart = wrapper.find('.hide-tab').at(0).getDOMNode()
    const tabEnd = wrapper.find('.hide-tab').at(1).getDOMNode()
    expect(document.activeElement).toBe(tabStart)

    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: KeyCode.Tab }))

    expect(tabEnd.outerHTML).toEqual(document.activeElement?.outerHTML)
    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: KeyCode.Tab }))
    expect(tabStart.outerHTML).toEqual(document.activeElement?.outerHTML)
  })

  it('should close modal when keyboard event is triggered', async () => {
    const wrapper = mount(
      <Modal visible={true}>
        <Modal.Title>Modal</Modal.Title>
      </Modal>,
    )
    expectModalIsOpened(wrapper)
    wrapper.simulate('keydown', {
      keyCode: KeyCode.Escape,
    })
    await updateWrapper(wrapper, 500)
    expectModalIsClosed(wrapper)
  })

  it('should prevent close modal when keyboard is false', async () => {
    const wrapper = mount(
      <Modal visible={true} keyboard={false}>
        <Modal.Title>Modal</Modal.Title>
      </Modal>,
    )
    expectModalIsOpened(wrapper)
    wrapper.simulate('keydown', {
      keyCode: KeyCode.Escape,
    })
    await updateWrapper(wrapper, 500)
    expectModalIsOpened(wrapper)
  })
})
