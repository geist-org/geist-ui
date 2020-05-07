import React from 'react'
import { mount, ReactWrapper } from 'enzyme'
import { useToasts, ZEITUIProvider } from 'components'
import { nativeEvent, updateWrapper } from 'tests/utils'

const MockToast: React.FC<{}> = () => {
  const [, setToast] = useToasts()
  const clickHandler = (e: any = {}) => {
    const keys = ['text', 'delay', 'type', 'actions']
    const params = keys.reduce((pre, key) => {
      const value = e.target[key]
      if (!value) return pre
      return { ...pre, [key]: value }
    }, {})
    setToast(params)
  }
  return (
    <div id="btn" onClick={clickHandler}>
      btn
    </div>
  )
}

const triggerToast = (wrapper: ReactWrapper, params = {}) => {
  wrapper.find('#btn').simulate('click', {
    ...nativeEvent,
    target: params,
  })
}

const expectToastIsShow = (wrapper: ReactWrapper) => {
  const toast = wrapper.find('.toast-container').find('.toast')
  expect(toast.length).not.toBe(0)
}

const expectToastIsHidden = (wrapper: ReactWrapper) => {
  const toast = wrapper.find('.toast-container').find('.toast')
  expect(toast.length).toBe(0)
}

describe('UseToast', () => {
  it('should render correctly', async () => {
    const wrapper = mount(
      <ZEITUIProvider>
        <MockToast />
      </ZEITUIProvider>,
    )

    expectToastIsHidden(wrapper)
    triggerToast(wrapper, { text: 'test-value' })
    await updateWrapper(wrapper)
    expectToastIsShow(wrapper)
  })

  it('should work with different types', async () => {
    const wrapper = mount(
      <ZEITUIProvider>
        <MockToast />
      </ZEITUIProvider>,
    )

    expectToastIsHidden(wrapper)
    triggerToast(wrapper, { type: 'success', text: 'hello' })
    await updateWrapper(wrapper)
    expectToastIsShow(wrapper)
    expect(wrapper.find('.toast-container').html()).toMatchSnapshot()
  })

  it('should close toast', async () => {
    const wrapper = mount(
      <ZEITUIProvider>
        <MockToast />
      </ZEITUIProvider>,
    )

    expectToastIsHidden(wrapper)
    triggerToast(wrapper, { delay: 100, text: 'hello' })
    await updateWrapper(wrapper, 0)
    expectToastIsShow(wrapper)
    // Element already hidden, but Dom was removed after delay
    await updateWrapper(wrapper, 350)
    const toast = wrapper.find('.toast-container').find('.hide')
    expect(toast.length).not.toBe(0)
  })

  it('the removeal should be delayed when hover is triggerd', async () => {
    const wrapper = mount(
      <ZEITUIProvider>
        <MockToast />
      </ZEITUIProvider>,
    )

    expectToastIsHidden(wrapper)
    triggerToast(wrapper, { delay: 100, text: 'hello' })
    await updateWrapper(wrapper, 0)
    expectToastIsShow(wrapper)

    wrapper.find('.toast-container').simulate('mouseEnter', nativeEvent)
    await updateWrapper(wrapper, 350)

    // Hover event will postpone hidden event
    let toast = wrapper.find('.toast-container').find('.hide')
    expect(toast.length).toBe(0)

    // Restart hidden event after mouse leave
    wrapper.find('.toast-container').simulate('mouseLeave', nativeEvent)
    await updateWrapper(wrapper, 350 + 200)
    toast = wrapper.find('.toast-container').find('.hide')
    expect(toast.length).not.toBe(0)
  })

  it('should render different actions', async () => {
    const wrapper = mount(
      <ZEITUIProvider>
        <MockToast />
      </ZEITUIProvider>,
    )
    const actions = [
      {
        name: 'remove',
        handler: () => {},
      },
      {
        name: 'remove',
        handler: () => {},
        passive: true,
      },
    ]

    triggerToast(wrapper, { actions, text: 'hello' })
    await updateWrapper(wrapper)
    expectToastIsShow(wrapper)
    expect(wrapper.find('.toast-container').html()).toMatchSnapshot()
  })

  it('should close toast when action triggered', async () => {
    const wrapper = mount(
      <ZEITUIProvider>
        <MockToast />
      </ZEITUIProvider>,
    )
    const actions = [
      {
        name: 'remove',
        handler: (_event: any, cancel: Function) => cancel(),
      },
    ]

    expectToastIsHidden(wrapper)
    triggerToast(wrapper, { actions, text: 'hello' })
    await updateWrapper(wrapper)
    expectToastIsShow(wrapper)
    wrapper.find('.action').find('.btn').at(0).simulate('click', nativeEvent)

    // Element already hidden, but Dom was removed after delay
    await updateWrapper(wrapper, 250)
    const toast = wrapper.find('.toast-container').find('.hide')
    expect(toast.length).not.toBe(0)
  })

  it('should work with multiple toasts', async () => {
    const wrapper = mount(
      <ZEITUIProvider>
        <MockToast />
      </ZEITUIProvider>,
    )

    expectToastIsHidden(wrapper)
    triggerToast(wrapper, { delay: 100, text: 'hello' })
    triggerToast(wrapper, { delay: 100, text: 'hello' })
    triggerToast(wrapper, { delay: 100, text: 'hello' })
    triggerToast(wrapper, { delay: 100, text: 'hello' })
    triggerToast(wrapper, { delay: 100, text: 'hello' })
    triggerToast(wrapper, { delay: 200, text: 'hello' })

    /**
     * If there are multiple Toasts at different deplay in the stack,
     * the destory Dom event will wait for the maximum delay time.
     */
    await updateWrapper(wrapper, 350)
    expectToastIsShow(wrapper)

    await updateWrapper(wrapper, 200)
    const toast = wrapper.find('.toast-container').find('.hide')
    expect(toast.length).not.toBe(0)
  })
})
