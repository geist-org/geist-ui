import React, { useEffect } from 'react'
import { mount, ReactWrapper } from 'enzyme'
import { Modal } from 'components'
import { nativeEvent, updateWrapper } from 'tests/utils'

export const expectModalIsOpened = (wrapper: ReactWrapper) => {
  expect(wrapper.find('.content').length).not.toBe(0)
}

export const expectModalIsClosed = (wrapper: ReactWrapper) => {
  expect(wrapper.find('.content').length).toBe(0)
}

describe('useModalHandle', () => {
  it('should follow change with use-imperative-modal', async () => {
    let log = ''
    jest.spyOn(console, 'log').mockImplementation(msg => (log = msg))
    const MockModal: React.FC<{ show?: boolean }> = ({ show }) => {
      const { getVisible, setVisible, ref } = Modal.useModalHandle()
      useEffect(() => {
        if (show !== undefined) setVisible(show)
        setTimeout(() => console.log(getVisible()), 0)
      }, [show])
      return (
        <Modal ref={ref}>
          <Modal.Title>Modal</Modal.Title>
        </Modal>
      )
    }

    const wrapper = mount(<MockModal />)
    wrapper.setProps({ show: true })
    await updateWrapper(wrapper, 300)
    expectModalIsOpened(wrapper)
    expect(log).toEqual(true)

    wrapper.setProps({ show: false })
    await updateWrapper(wrapper, 500)
    expectModalIsClosed(wrapper)
    expect(log).toEqual(false)
  })

  it('should close directly when open is undefined', async () => {
    const MockModal: React.FC<{ show?: boolean }> = ({ show }) => {
      const { setVisible, ref } = Modal.useModalHandle()
      useEffect(() => {
        if (show !== undefined) setVisible(show)
      }, [show])
      return (
        <Modal ref={ref} onClose={() => setVisible(false)}>
          <Modal.Title>Modal</Modal.Title>
        </Modal>
      )
    }

    const wrapper = mount(<MockModal />)
    wrapper.setProps({ show: true })
    await updateWrapper(wrapper, 500)
    wrapper.find('.backdrop').simulate('click', nativeEvent)
    await updateWrapper(wrapper, 500)
    expectModalIsClosed(wrapper)
  })

  it('should close directly when open is undefined', async () => {
    const MockModal: React.FC<{ show?: boolean }> = ({ show }) => {
      const { setVisible, ref } = Modal.useModalHandle()
      useEffect(() => {
        if (show !== undefined) setVisible(show)
      }, [show])
      return (
        <Modal ref={ref} onClose={() => setVisible(false)}>
          <Modal.Title>Modal</Modal.Title>
        </Modal>
      )
    }

    const wrapper = mount(<MockModal />)
    wrapper.setProps({ show: true })
    await updateWrapper(wrapper, 500)
    wrapper.find('.backdrop').simulate('click', nativeEvent)
    await updateWrapper(wrapper, 500)
    expectModalIsClosed(wrapper)
  })

  it('when setVisible set undefined, should close directly', async () => {
    const MockModal: React.FC<{ show?: boolean }> = ({ show }) => {
      const { setVisible, ref } = Modal.useModalHandle()
      useEffect(() => {
        if (show !== undefined) setVisible(show)
      }, [show])
      return (
        <Modal ref={ref} onClose={() => setVisible()}>
          <Modal.Title>Modal</Modal.Title>
        </Modal>
      )
    }

    const wrapper = mount(<MockModal />)
    wrapper.setProps({ show: true })
    await updateWrapper(wrapper, 500)
    wrapper.find('.backdrop').simulate('click', nativeEvent)
    await updateWrapper(wrapper, 500)
    expectModalIsClosed(wrapper)
  })
})
