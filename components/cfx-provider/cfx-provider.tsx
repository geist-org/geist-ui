import React, { PropsWithChildren, useMemo, useState } from 'react'
import {
  CfxUIContent,
  CfxUIContextParams,
  UpdateToastsFunction,
  UpdateMessagesFunction,
} from '../utils/use-cfx-ui-context'
import ThemeProvider from '../styles/theme-provider'
import { ThemeParam } from '../styles/theme-provider/theme-provider'
import useCurrentState from '../utils/use-current-state'
import ToastContainer, { ToastWithID } from '../use-toasts/toast-container'
import MessageContainer from '../use-messages/message-container'
import { MessageItemProps } from '../use-messages/message-item'

export interface Props {
  theme?: ThemeParam
}

const CfxProvider: React.FC<PropsWithChildren<Props>> = ({ theme, children }) => {
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

  const initialValue = useMemo<CfxUIContextParams>(
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
    <CfxUIContent.Provider value={initialValue}>
      <ThemeProvider theme={theme}>
        {children}
        <ToastContainer />
        <MessageContainer />
      </ThemeProvider>
    </CfxUIContent.Provider>
  )
}

export default CfxProvider
