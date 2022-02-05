import React, { PropsWithChildren, useMemo, useState } from 'react'
import {
  GeistUIContent,
  defaultToastLayout,
  GeistUIContextParams,
  UpdateToastsFunction,
  UpdateToastsIDFunction,
  UpdateToastsLayoutFunction,
} from '../utils/use-geist-ui-context'
import ThemeProvider from './theme-provider'
import useCurrentState from '../utils/use-current-state'
import ToastContainer from '../use-toasts/toast-container'
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
  const [lastUpdateToastId, setLastUpdateToastId] =
    useState<GeistUIContextParams['lastUpdateToastId']>(null)
  const [toasts, setToasts, toastsRef] = useCurrentState<GeistUIContextParams['toasts']>(
    [],
  )
  const [toastLayout, setToastLayout, toastLayoutRef] =
    useCurrentState<GeistUIContextParams['toastLayout']>(defaultToastLayout)
  const updateToasts: UpdateToastsFunction = fn => {
    const nextToasts = fn(toastsRef.current)
    setToasts(nextToasts)
  }
  const updateToastLayout: UpdateToastsLayoutFunction = fn => {
    const nextLayout = fn(toastLayoutRef.current)
    setToastLayout(nextLayout)
  }
  const updateLastToastId: UpdateToastsIDFunction = fn => {
    setLastUpdateToastId(fn())
  }

  const initialValue = useMemo<GeistUIContextParams>(
    () => ({
      toasts,
      toastLayout,
      updateToasts,
      lastUpdateToastId,
      updateToastLayout,
      updateLastToastId,
    }),
    [toasts, toastLayout, lastUpdateToastId],
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
