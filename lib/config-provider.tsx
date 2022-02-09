import React, { useMemo, useState } from 'react'
import { ConfigContext, Configs } from 'lib/config-context'
import { useRouter } from 'next/router'
import type { DeepPartial } from 'components/utils/types'
import { GeistUIThemes, Themes } from 'components'
import { useTheme } from 'components'
import { CHINESE_LANGUAGE_IDENT, CUSTOM_THEME_TYPE } from './constants'

const defaultProps = {}

export type ConfigProviderProps = {
  onThemeChange?: (themes: DeepPartial<GeistUIThemes>) => void
  onThemeTypeChange?: (type: string) => void
}

const ConfigProvider: React.FC<React.PropsWithChildren<ConfigProviderProps>> = React.memo(
  ({
    onThemeChange,
    onThemeTypeChange,
    children,
  }: React.PropsWithChildren<ConfigProviderProps> & typeof defaultProps) => {
    const theme = useTheme()
    const { pathname } = useRouter()
    const [isChinese, setIsChinese] = useState<boolean>(() =>
      pathname.includes(CHINESE_LANGUAGE_IDENT),
    )
    const [scrollHeight, setScrollHeight] = useState<number>(0)
    const [customTheme, setCustomTheme] = useState<GeistUIThemes>(theme)

    const updateSidebarScrollHeight = (height: number) => setScrollHeight(height)
    const updateChineseState = (state: boolean) => setIsChinese(state)
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
        customTheme,
        switchTheme,
        updateCustomTheme,
        updateChineseState,
        sidebarScrollHeight: scrollHeight,
        updateSidebarScrollHeight,
      }),
      [onThemeChange, scrollHeight, isChinese],
    )

    return (
      <ConfigContext.Provider value={initialValue}>{children}</ConfigContext.Provider>
    )
  },
)

ConfigProvider.defaultProps = defaultProps
ConfigProvider.displayName = 'GeistConfigProvider'
export default ConfigProvider
