import React from 'react'
import { mount, ReactWrapper } from 'enzyme'
import { useMessages, CfxProvider } from 'components'
import { nativeEvent, updateWrapper } from 'tests/utils'
import Github from '@zeit-ui/react-icons/github'

const MockMessage: React.FC<{}> = () => {
  const [, setMessage] = useMessages()
  const clickHandler = (e: any = {}) => {
    const keys = ['text', 'delay', 'color', 'closeable', 'shadow', 'icon']
    const params = keys.reduce((pre, key) => {
      const value = e.target[key]
      if (value === undefined) return pre
      return { ...pre, [key]: value }
    }, {})
    setMessage(params)
  }
  return (
    <div id="btn" onClick={clickHandler}>
      btn
    </div>
  )
}

const triggerMessage = (wrapper: ReactWrapper, params = {}) => {
  wrapper.find('#btn').simulate('click', {
    ...nativeEvent,
    target: params,
  })
}

const expectMessageIsShow = (wrapper: ReactWrapper) => {
  const message = wrapper.find('.message-container').find('.message')
  expect(message.length).not.toBe(0)
}

const expectMessageIsHidden = (wrapper: ReactWrapper) => {
  const message = wrapper.find('.message-container').find('.message')
  expect(message.length).toBe(0)
}

describe('UseMessage', () => {
  it('should render correctly', async () => {
    const wrapper = mount(
      <CfxProvider>
        <MockMessage />
      </CfxProvider>,
    )

    expectMessageIsHidden(wrapper)
    triggerMessage(wrapper, { text: 'test-value' })
    await updateWrapper(wrapper, 50)
    expectMessageIsShow(wrapper)
    expect(wrapper.find('.message-container').html()).toMatchSnapshot()
  })

  it('should work with different colors', async () => {
    const wrapper = mount(
      <CfxProvider>
        <MockMessage />
      </CfxProvider>,
    )

    expectMessageIsHidden(wrapper)
    triggerMessage(wrapper, { color: 'primary', text: 'primary' })
    triggerMessage(wrapper, { color: 'success', text: 'success' })
    triggerMessage(wrapper, { color: 'warning', text: 'warning' })
    triggerMessage(wrapper, { color: 'error', text: 'error' })
    await updateWrapper(wrapper, 50)
    expectMessageIsShow(wrapper)
    expect(wrapper.find('.message-container').html()).toMatchSnapshot()
  })

  it('should render no shadow correctly', async () => {
    const wrapper = mount(
      <CfxProvider>
        <MockMessage />
      </CfxProvider>,
    )

    expectMessageIsHidden(wrapper)
    triggerMessage(wrapper, {
      text: 'no-shadow',
      color: 'success',
      shadow: false,
      closeable: true,
    })
    await updateWrapper(wrapper, 50)
    expectMessageIsShow(wrapper)
    expect(wrapper.find('.message-container').html()).toMatchSnapshot()
  })

  it('should render with custom icon correctly', async () => {
    const wrapper = mount(
      <CfxProvider>
        <MockMessage />
      </CfxProvider>,
    )

    expectMessageIsHidden(wrapper)
    triggerMessage(wrapper, { text: 'custom icon', icon: <Github color="red" /> })
    await updateWrapper(wrapper, 50)
    expectMessageIsShow(wrapper)
    expect(wrapper.find('.message-container').html()).toMatchSnapshot()
  })

  it('should close message after delay config duration', async () => {
    const wrapper = mount(
      <CfxProvider>
        <MockMessage />
      </CfxProvider>,
    )

    expectMessageIsHidden(wrapper)
    triggerMessage(wrapper, { delay: 100, text: 'close after delay' })
    await updateWrapper(wrapper, 50)
    expectMessageIsShow(wrapper)
    // Element already hidden, but Dom was removed after delay
    await updateWrapper(wrapper, 350)
    const message = wrapper.find('.message-container').find('.message')
    expect(message.length).toBe(0)
  })

  it('should close message manually', async () => {
    const wrapper = mount(
      <CfxProvider>
        <MockMessage />
      </CfxProvider>,
    )

    expectMessageIsHidden(wrapper)
    triggerMessage(wrapper, { delay: 0, text: 'close manually', closeable: true })
    await updateWrapper(wrapper, 50)
    expectMessageIsShow(wrapper)
    wrapper.find('.message').find('.close').at(0).simulate('click', nativeEvent)
    // Element already hidden, but Dom was removed after delay
    await updateWrapper(wrapper, 350)
    const message = wrapper.find('.message-container').find('.message')
    expect(message.length).toBe(0)
  })

  it('keep display when hover on', async () => {
    const wrapper = mount(
      <CfxProvider>
        <MockMessage />
      </CfxProvider>,
    )

    expectMessageIsHidden(wrapper)
    triggerMessage(wrapper, { delay: 100, text: 'display when hover is trigger' })
    await updateWrapper(wrapper, 50)
    expectMessageIsShow(wrapper)

    wrapper.find('.message-container').find('.message').simulate('mouseEnter', nativeEvent)
    await updateWrapper(wrapper, 200)

    // Hover event will postpone hidden event
    expectMessageIsShow(wrapper)
    let message = wrapper.find('.message-container').find('.message')
    expect(message.length).toBe(1)

    // Restart hidden event after mouse leave
    wrapper.find('.message-container').find('.message').simulate('mouseLeave', nativeEvent)
    await updateWrapper(wrapper, 350)
    message = wrapper.find('.message-container').find('.message')
    expect(message.length).toBe(0)
  })

  it('should work with multiple messages', async () => {
    const wrapper = mount(
      <CfxProvider>
        <MockMessage />
      </CfxProvider>,
    )

    expectMessageIsHidden(wrapper)
    triggerMessage(wrapper, { delay: 100, text: 'hello' })
    triggerMessage(wrapper, { delay: 100, text: 'hello' })
    triggerMessage(wrapper, { delay: 100, text: 'hello' })
    triggerMessage(wrapper, { delay: 100, text: 'hello' })
    triggerMessage(wrapper, { delay: 100, text: 'hello' })
    triggerMessage(wrapper, { delay: 100, text: 'hello' })

    await updateWrapper(wrapper, 200)
    expectMessageIsShow(wrapper)
    const visibleMessage = wrapper.find('.message-container').find('.message')
    expect(visibleMessage.length).toBe(6)

    await updateWrapper(wrapper, 350)
    const message = wrapper.find('.message-container').find('.message')
    expect(message.length).toBe(0)
  })
})
