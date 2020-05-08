import React from 'react'
import { mount } from 'enzyme'
import { Modal } from 'components'
import { nativeEvent, updateWrapper } from 'tests/utils'
import { expectModalIsClosed, expectModalIsOpened } from './use-modal.test'

describe('Modal', () => {
  it('should render correctly', () => {
    const wrapper = mount(
      <Modal open={true}>
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
    const openHandler = jest.fn()
    const closeHandler = jest.fn()
    const wrapper = mount(
      <Modal onOpen={openHandler} onClose={closeHandler}>
        <Modal.Title>Modal</Modal.Title>
      </Modal>,
    )
    expectModalIsClosed(wrapper)

    wrapper.setProps({ open: true })
    await updateWrapper(wrapper, 350)
    expectModalIsOpened(wrapper)
    expect(openHandler).toHaveBeenCalled()

    wrapper.find('.backdrop').simulate('click', nativeEvent)
    await updateWrapper(wrapper, 500)
    expectModalIsClosed(wrapper)
    expect(closeHandler).toHaveBeenCalled()
  })

  it('should disable backdrop event', async () => {
    const closeHandler = jest.fn()
    const wrapper = mount(
      <Modal open={true} disableBackdropClick onClose={closeHandler}>
        <Modal.Title>Modal</Modal.Title>
        <Modal.Action>Submit</Modal.Action>
      </Modal>,
    )
    wrapper.find('.backdrop').simulate('click', nativeEvent)
    await updateWrapper(wrapper, 500)
    expectModalIsOpened(wrapper)
    expect(closeHandler).not.toHaveBeenCalled()
  })

  it('should ignore backdrop disabled when actions missing', async () => {
    const closeHandler = jest.fn()
    const wrapper = mount(
      <Modal open={true} disableBackdropClick onClose={closeHandler}>
        <Modal.Title>Modal</Modal.Title>
      </Modal>,
    )
    wrapper.find('.backdrop').simulate('click', nativeEvent)
    await updateWrapper(wrapper, 500)
    expectModalIsClosed(wrapper)
    expect(closeHandler).toHaveBeenCalled()
  })

  it('should ignore event when action disabled', () => {
    const actions1 = jest.fn()
    const actions2 = jest.fn()
    const wrapper = mount(
      <Modal open={true}>
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
      <Modal open={true} onClose={closeHandler}>
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
      <Modal open={true} width="100px" wrapClassName="test-class">
        <Modal.Title>Modal</Modal.Title>
      </Modal>,
    )
    const html = wrapper.find('.wrapper').html()
    expect(html).toMatchSnapshot()
    expect(html).toContain('test-class')
    expect(() => wrapper.unmount()).not.toThrow()
  })
})
