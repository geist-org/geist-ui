import React, { useEffect } from 'react'
import { MessageColors } from '../utils/prop-types'
// import useCurrentState from '../utils/use-current-state'
import { useZEITUIContext } from '../utils/use-zeit-ui-context'
import { MessageWithID } from './message-container'
import { getId } from '../utils/collections'

export interface Message {
  icon: React.ReactNode
  text?: string
  color?: MessageColors
  delay?: number
  closeable?: boolean
  shadow?: boolean
}

const defaultMessage = {
  delay: 2000,
  color: 'default',
  closeable: false,
  shadow: true,
}

let destoryStack: Array<string> = []
let maxDestoryTime: number = 0
let destoryTimer: number | undefined

const useMessages = (): [Array<Message>, (t: Message) => void] => {
  const { updateMessages, messages } = useZEITUIContext()
  // const [, setHovering, hoveringRef] = useCurrentState<boolean>(messageHovering)

  // useEffect(() => setHovering(messageHovering), [messageHovering])

  const destoryAll = (delay: number, time: number) => {
    /* istanbul ignore next */
    if (time <= maxDestoryTime) return
    clearTimeout(destoryTimer)
    maxDestoryTime = time

    destoryTimer = window.setTimeout(() => {
      /* istanbul ignore next */
      updateMessages((currentMessages: Array<MessageWithID>) => {
        if (destoryStack.length < currentMessages.length) {
          return currentMessages
        }
        destoryStack = []
        return []
      })
      clearTimeout(destoryTimer)
    }, delay + 350)
  }

  const setMessage = (message: Message): void => {
    const id = `message-${getId()}`
    const delay = message.delay || defaultMessage.delay

    const cancel = (id: string, delay: number) => {
      updateMessages((currentMessages: Array<MessageWithID>) => {
        return currentMessages.map(item => {
          if (item.id !== id) return item
          return { ...item, willBeDestroy: true }
        })
      })
      destoryStack.push(id)
      destoryAll(delay, performance.now())
    }

    updateMessages((currentMessages: Array<MessageWithID>) => {
      const newMessage = {
        ...message,
        id,
        delay,
        cancel: () => cancel(id, delay),
      }
      return [...currentMessages, newMessage]
    })

    const hideMessage = (id: string, delay: number) => {
      const hideTimer = window.setTimeout(() => {
        // if (hoveringRef.current) {
        //   hideMessage(id, delay)
        //   return clearTimeout(hideTimer)
        // }
        cancel(id, delay)
        clearTimeout(hideTimer)
      }, delay)
    }

    hideMessage(id, delay)
  }

  return [messages, setMessage]
}

export default useMessages
