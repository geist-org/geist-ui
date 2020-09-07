import React, { useMemo } from 'react'
import { createPortal } from 'react-dom'
import usePortal from '../utils/use-portal'
import { useCfxUIContext } from '../utils/use-cfx-ui-context'
import MessageItem from './message-item'

const MessageContainer: React.FC<React.PropsWithChildren<{}>> = () => {
  const portal = usePortal('message')
  const { messages } = useCfxUIContext()
  const messageElements = useMemo(
    () => messages.map(t => <MessageItem key={`message-${t.id}`} {...t} />),
    [messages],
  )
  if (!portal) return null
  if (!messages || messages.length === 0) return null
  return createPortal(
    <div className="message-container">
      {messageElements}
      <style jsx>{`
        .message-container {
          position: fixed;
          min-height: 10px;
          top: 20px;
          left: 0;
          right: 0;
          z-index: 2000;
          box-sizing: border-box;
          overflow: visible;
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 0;
          visibility: visible;
        }
      `}</style>
    </div>,
    portal,
  )
}

export default MessageContainer
