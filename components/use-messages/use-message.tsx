import React from 'react'
import { MessageColors } from '../utils/prop-types'
import { useZEITUIContext } from '../utils/use-zeit-ui-context'
import { getId } from '../utils/collections'
import { MessageItemProps } from './message-item'

export interface Message {
  icon?: React.ReactNode
  text?: string
  color?: MessageColors
  delay?: number
  closeable?: boolean
  shadow?: boolean
  className?: string
  onClose?: (id: string) => void
}
const defaultMessage = {
  delay: 2000,
  color: 'default' as MessageColors,
  closeable: false,
  shadow: true,
  className: '',
}

const useMessages = (): [Array<Message>, (t: Message) => void] => {
  const { updateMessages, messages } = useZEITUIContext()
  const setMessage = (message: Message): void => {
    const id = `message-${getId()}`
    const destroy = (id: string) => {
      updateMessages((currentMessages: Array<MessageItemProps>) => {
        return currentMessages.filter(item => {
          return item.id !== id
        })
      })
    }
    updateMessages((currentMessages: Array<MessageItemProps>) => {
      const newMessage: MessageItemProps = {
        ...defaultMessage,
        id,
        destroy,
        ...message,
      }
      return [...currentMessages, newMessage]
    })
  }
  return [messages, setMessage]
}

export default useMessages
