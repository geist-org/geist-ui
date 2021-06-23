import React, { PropsWithChildren, useMemo, useState } from 'react'
import {
  GeistUIContent,
  GeistUIContextParams,
  UpdateToastsFunction,
} from '../utils/use-geist-ui-context'
import ThemeProvider from './theme-provider'
import useCurrentState from '../utils/use-current-state'
import ToastContainer, { ToastWithID } from '../use-toasts/toast-container'
import { GeistUIThemes } from '../themes/presets'

export type GeistProviderProps = {
  themes?: Array<GeistUIThemes>
  themeType?: string | 'dark' | 'light'
}

const GeistProvider: React.FC<PropsWithChildren<GeistProviderProps>> = ({
  themes,
  themeType,
  children,
}) => {
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

  const initialValue = useMemo<GeistUIContextParams>(
    () => ({
      toasts,
      toastHovering,
      updateToasts,
      updateToastHoverStatus,
    }),
    [toasts, toastHovering],
  )

  return (
    <GeistUIContent.Provider value={initialValue}>
      <ThemeProvider themes={themes} themeType={themeType}>
        {children}
        <ToastContainer />
      </ThemeProvider>
    </GeistUIContent.Provider>
  )
}

export default GeistProvider
