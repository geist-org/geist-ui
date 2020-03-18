import React, { useMemo, useState } from 'react'
import withDefaults from 'components/utils/with-defaults'
import { ConfigContext } from 'lib/states/config-context'

interface Props {
  onChange?: Function
}

const defaultProps = {
}

export type ConfigProviderProps = Props & typeof defaultProps

const ConfigProvider: React.FC<React.PropsWithChildren<ConfigProviderProps>> = React.memo(({
  onChange, children,
}) => {
  const [shouldScroll, setShouldScroll] = useState<boolean>(false)
  const updateShouldScroll = (next: boolean) => {
    setShouldScroll(next)
  }
  const initialValue = useMemo(() => ({
    onChange,
    shouldScroll,
    updateShouldScroll,
  }), [onChange, shouldScroll])

  return (
    <ConfigContext.Provider value={initialValue}>
      {children}
    </ConfigContext.Provider>
  )
})

export default withDefaults(ConfigProvider, defaultProps)
