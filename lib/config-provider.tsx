import React, { useMemo, useState } from 'react'
import withDefaults from 'components/utils/with-defaults'
import { ConfigContext, Configs } from 'lib/config-context'
import { useRouter } from 'next/router'
import { DeepPartial } from 'components/utils/types'
import { GeistUIThemes, Themes } from 'components'
import { useTheme } from 'components'
import { CHINESE_LANGUAGE_IDENT, CUSTOM_THEME_TYPE } from './constants'

interface Props {
  onThemeChange?: (themes: DeepPartial<GeistUIThemes>) => void
  onThemeTypeChange?: (type: string) => void
}

const defaultProps = {}

export type ConfigProviderProps = Props & typeof defaultProps

const ConfigProvider: React.FC<React.PropsWithChildren<ConfigProviderProps>> = React.memo(
  ({ onThemeChange, onThemeTypeChange, children }) => {
    const theme = useTheme()
    const { pathname } = useRouter()
    const [isChinese, setIsChinese] = useState<boolean>(() =>
      pathname.includes(CHINESE_LANGUAGE_IDENT),
    )
    const [scrollHeight, setScrollHeight] = useState<number>(0)
    const [tabbarFixed, setTabbarFixed] = useState<boolean>(false)
    const [customTheme, setCustomTheme] = useState<GeistUIThemes>(theme)

    const updateSidebarScrollHeight = (height: number) => setScrollHeight(height)
    const updateChineseState = (state: boolean) => setIsChinese(state)
    const updateTabbarFixed = (state: boolean) => setTabbarFixed(state)
    const updateCustomTheme = (nextTheme: DeepPartial<GeistUIThemes>) => {
      const mergedTheme = Themes.create(theme, { ...nextTheme, type: CUSTOM_THEME_TYPE })
      setCustomTheme(mergedTheme)
      onThemeChange && onThemeChange(mergedTheme)
    }
    const switchTheme = (type: string) => {
      onThemeTypeChange && onThemeTypeChange(type)
    }

    const initialValue = useMemo<Configs>(
      () => ({
        onThemeChange,
        isChinese,
        tabbarFixed,
        customTheme,
        switchTheme,
        updateCustomTheme,
        updateTabbarFixed,
        updateChineseState,
        sidebarScrollHeight: scrollHeight,
        updateSidebarScrollHeight,
      }),
      [onThemeChange, scrollHeight, tabbarFixed, isChinese],
    )

    return (
      <ConfigContext.Provider value={initialValue}>{children}</ConfigContext.Provider>
    )
  },
)

export default withDefaults(ConfigProvider, defaultProps)
