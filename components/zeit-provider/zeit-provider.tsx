import React, { PropsWithChildren, useMemo, useState } from 'react'
import {
  ZEITUIContent,
  ZeitUiContextParams,
  UpdateToastsFunction,
  UpdateMessagesFunction,
} from '../utils/use-zeit-ui-context'
import ThemeProvider from '../styles/theme-provider'
import { ThemeParam } from '../styles/theme-provider/theme-provider'
import useCurrentState from '../utils/use-current-state'
import ToastContainer, { ToastWithID } from '../use-toasts/toast-container'
import MessageContainer from '../use-messages/message-container'
import { MessageItemProps } from '../use-messages/message-item'

export interface Props {
  theme?: ThemeParam
}

const ZeitProvider: React.FC<PropsWithChildren<Props>> = ({ theme, children }) => {
  const [toasts, setToasts, toastsRef] = useCurrentState<Array<ToastWithID>>([])
  const [toastHovering, setToastHovering] = useState<boolean>(false)
  const updateToasts: UpdateToastsFunction<ToastWithID> = (
    fn: (toasts: ToastWithID[]) => ToastWithID[],
  ) => {
    const nextToasts = fn(toastsRef.current)
    setToasts(nextToasts)
  }
  const updateToastHoverStatus = (fn: () => boolean) => {
    const nextHoverStatus = fn()
    setToastHovering(nextHoverStatus)
  }

  const [messages, setMessages, messagesRef] = useCurrentState<Array<MessageItemProps>>([])
  const updateMessages: UpdateMessagesFunction<MessageItemProps> = (
    fn: (messages: MessageItemProps[]) => MessageItemProps[],
  ) => {
    const nextMessages = fn(messagesRef.current)
    setMessages(nextMessages)
  }

  const initialValue = useMemo<ZeitUiContextParams>(
    () => ({
      messages,
      updateMessages,
      toasts,
      toastHovering,
      updateToasts,
      updateToastHoverStatus,
    }),
    [toasts, toastHovering, messages],
  )

  return (
    <ZEITUIContent.Provider value={initialValue}>
      <ThemeProvider theme={theme}>
        {children}
        <ToastContainer />
        <MessageContainer />
      </ThemeProvider>
    </ZEITUIContent.Provider>
  )
}

export default ZeitProvider
