import React, { useMemo } from 'react'
import { Button, useTheme, Select, Spacer, Themes, useAllThemes } from 'components'
import { useConfigs } from 'lib/config-context'
import useLocale from 'lib/use-locale'
import Router, { useRouter } from 'next/router'
import MoonIcon from '@geist-ui/react-icons/moon'
import SunIcon from '@geist-ui/react-icons/sun'
import UserIcon from '@geist-ui/react-icons/user'
import {
  CHINESE_LANGUAGE_IDENT,
  CUSTOM_THEME_TYPE,
  ENGLISH_LANGUAGE_IDENT,
  GITHUB_URL,
} from 'lib/constants'

const Controls: React.FC<unknown> = React.memo(() => {
  const theme = useTheme()
  const { themes } = useAllThemes()
  const { switchTheme, updateChineseState } = useConfigs()
  const { pathname } = useRouter()
  const { locale } = useLocale()
  const isChinese = useMemo(() => locale === CHINESE_LANGUAGE_IDENT, [locale])
  const nextLocalePath = useMemo(() => {
    const nextLocale = isChinese ? ENGLISH_LANGUAGE_IDENT : CHINESE_LANGUAGE_IDENT
    return pathname.replace(locale, nextLocale)
  }, [locale, pathname])
  const hasCustomTheme = useMemo(() => Themes.hasUserCustomTheme(themes), [themes])

  const switchThemes = (type: string) => {
    switchTheme(type)
    if (typeof window === 'undefined' || !window.localStorage) return
    window.localStorage.setItem('theme', type)
  }
  const switchLanguages = () => {
    updateChineseState(!isChinese)
    Router.push(nextLocalePath)
  }
  const redirectGithub = () => {
    if (typeof window === 'undefined') return
    window.open(GITHUB_URL)
  }

  return (
    <div className="controls">
      <div className="tools">
        <Button auto type="abort" scale={0.5} onClick={switchLanguages}>
          {isChinese ? 'English' : '中文文档'}
        </Button>
        <Button
          auto
          type="abort"
          scale={0.5}
          onClick={redirectGithub}
          title={isChinese ? '代码仓库' : 'GitHub Repository'}>
          {isChinese ? '代码仓库' : 'GitHub'}
        </Button>
        <Spacer w={0.75} />
        <Select
          scale={0.5}
          pure
          onChange={switchThemes}
          value={theme.type}
          title={isChinese ? '切换主题' : 'Switch Themes'}>
          <Select.Option value="light">
            <span className="select-content">
              <SunIcon size={14} /> {isChinese ? '明亮' : 'Light'}
            </span>
          </Select.Option>
          <Select.Option value="dark">
            <span className="select-content">
              <MoonIcon size={14} /> {isChinese ? '暗黑' : 'Dark'}
            </span>
          </Select.Option>
          {hasCustomTheme && (
            <Select.Option value={CUSTOM_THEME_TYPE}>
              <span className="select-content">
                <UserIcon size={14} /> {CUSTOM_THEME_TYPE}
              </span>
            </Select.Option>
          )}
        </Select>
      </div>
      <style jsx>{`
        .controls {
          height: 100%;
          display: flex;
          margin: 0;
          position: relative;
        }

        .controls :global(.select) {
          width: min-content;
          min-width: unset;
        }

        .select-content {
          width: auto;
          height: 18px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .select-content :global(svg) {
          margin-right: 0.5rem;
        }

        .tools {
          display: flex;
          height: 2.5rem;
          box-sizing: border-box;
          align-items: center;
        }

        @media only screen and (max-width: ${theme.layout.breakpointMobile}) {
          .controls {
            display: none;
            pointer-events: none;
            visibility: hidden;
          }
        }
      `}</style>
    </div>
  )
})

export default Controls
