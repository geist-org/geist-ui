import React, { PropsWithChildren, useMemo, useState } from 'react'
import {
  ZEITUIContent,
  ZeitUiContextParams,
  UpdateToastsFunction,
} from '../utils/use-zeit-ui-context'
import ThemeProvider from '../styles/theme-provider'
import { ThemeParam } from '../styles/theme-provider/theme-provider'
import useCurrentState from '../utils/use-current-state'
import ToastContainer, { ToastWithID } from '../toast/toast-container'

export interface Props {
  theme?: ThemeParam
}

const ZEITUIProvider: React.FC<PropsWithChildren<Props>> = ({ theme, children }) => {
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

  const initialValue = useMemo<ZeitUiContextParams>(
    () => ({
      toasts,
      toastHovering,
      updateToasts,
      updateToastHoverStatus,
    }),
    [toasts, toastHovering],
  )

  return (
    <ZEITUIContent.Provider value={initialValue}>
      <ThemeProvider theme={theme}>
        {children}
        <ToastContainer />
      </ThemeProvider>
    </ZEITUIContent.Provider>
  )
}

export default ZEITUIProvider
