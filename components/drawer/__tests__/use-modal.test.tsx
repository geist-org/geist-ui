import React, { useEffect } from 'react'
import { mount, ReactWrapper } from 'enzyme'
import { Drawer, useModal } from 'components'
import { updateWrapper } from 'tests/utils'

export const expectDrawerIsOpened = (wrapper: ReactWrapper) => {
  expect(wrapper.find('.content').length).not.toBe(0)
}

export const expectDrawerIsClosed = (wrapper: ReactWrapper) => {
  expect(wrapper.find('.content').length).toBe(0)
}

describe('UseModal & Drawer', () => {
  it('should follow change with use-modal', async () => {
    const MockModal: React.FC<{ show?: boolean }> = ({ show }) => {
      const { setVisible, bindings } = useModal()
      useEffect(() => {
        if (show !== undefined) setVisible(show)
      }, [show])
      return (
        <Drawer {...bindings}>
          <Drawer.Title>Drawer</Drawer.Title>
        </Drawer>
      )
    }

    const wrapper = mount(<MockModal />)
    wrapper.setProps({ show: true })
    await updateWrapper(wrapper, 300)
    expectDrawerIsOpened(wrapper)

    wrapper.setProps({ show: false })
    await updateWrapper(wrapper, 500)
    expectDrawerIsClosed(wrapper)
  })
})
