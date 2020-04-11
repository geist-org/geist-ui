import React, { useMemo, useState } from 'react'
import withDefaults from 'components/utils/with-defaults'
import { ConfigContext, Configs } from 'lib/config-context'
import { useRouter } from 'next/router'
import { DeepPartial } from 'components/utils/types'
import { ZeitUIThemes } from 'components/styles/themes'
import { deepMergeObject } from 'components/styles/theme-provider/theme-provider'
import useCurrentState from 'components/utils/use-current-state'
import { useTheme } from 'components'

interface Props {
  onThemeChange?: Function
}

const defaultProps = {
}

export type ConfigProviderProps = Props & typeof defaultProps

const ConfigProvider: React.FC<React.PropsWithChildren<ConfigProviderProps>> = React.memo(({
  onThemeChange, children,
}) => {
  const theme = useTheme()
  const { pathname } = useRouter()
  const [isChinese, setIsChinese] = useState<boolean>(() => pathname.includes('zh-cn'))
  const [scrollHeight, setScrollHeight] = useState<number>(0)
  const [tabbarFixed, setTabbarFixed] = useState<boolean>(false)
  const [customTheme, setCustomTheme, customThemeRef] = useCurrentState<DeepPartial<ZeitUIThemes>>(theme)
  
  const updateSidebarScrollHeight = (height: number) => setScrollHeight(height)
  const updateChineseState = (state: boolean) => setIsChinese(state)
  const updateTabbarFixed = (state: boolean) => setTabbarFixed(state)
  const updateCustomTheme = (nextTheme: DeepPartial<ZeitUIThemes>) => {
    const mergedTheme = deepMergeObject(customThemeRef.current, nextTheme)
    setCustomTheme(mergedTheme)
    onThemeChange && onThemeChange(mergedTheme)
  }

  const initialValue = useMemo<Configs>(() => ({
    onThemeChange, isChinese, tabbarFixed,
    customTheme,
    updateCustomTheme,
    updateTabbarFixed,
    updateChineseState,
    sidebarScrollHeight: scrollHeight,
    updateSidebarScrollHeight,
  }), [onThemeChange, scrollHeight, tabbarFixed, isChinese])

  return (
    <ConfigContext.Provider value={initialValue}>
      {children}
    </ConfigContext.Provider>
  )
})

export default withDefaults(ConfigProvider, defaultProps)
