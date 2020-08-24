import React, { useMemo } from 'react'
import { Button, useTheme, Select, Spacer } from 'components'
import { useConfigs } from 'lib/config-context'
import useLocale from 'lib/use-locale'
import Router, { useRouter } from 'next/router'
import MoonIcon from '@geist-ui/react-icons/moon'
import SunIcon from '@geist-ui/react-icons/sun'

const Controls: React.FC<{}> = React.memo(({}) => {
  const theme = useTheme()
  const { updateCustomTheme, updateChineseState } = useConfigs()
  const { pathname } = useRouter()
  const { locale } = useLocale()
  const isChinese = useMemo(() => locale === 'zh-cn', [locale])
  const isDark = useMemo(() => theme.type === 'dark', [theme.type])
  const nextLocalePath = useMemo(() => {
    const nextLocale = isChinese ? 'en-us' : 'zh-cn'
    return pathname.replace(locale, nextLocale)
  }, [locale, pathname])

  const switchThemes = (type: 'dark' | 'light') => {
    updateCustomTheme({ type })
    if (typeof window === 'undefined' || !window.localStorage) return
    window.localStorage.setItem('theme', type)
  }
  const switchLanguages = () => {
    updateChineseState(!isChinese)
    Router.push(nextLocalePath)
  }
  const redirectGithub = () => {
    if (typeof window !== 'undefined') {
      window.open('https://github.com/geist-org/react')
    }
  }

  return (
    <div className="controls">
      <div className="tools">
        <Button auto type="abort" size="small" onClick={switchLanguages}>
          {isChinese ? 'English' : '中文文档'}
        </Button>
        <Spacer x={0.25} />
        <Button
          auto
          type="abort"
          size="small"
          onClick={redirectGithub}
          title={isChinese ? '代码仓库' : 'GitHub Repository'}>
          {isChinese ? '代码仓库' : 'GitHub'}
        </Button>
        <Spacer x={0.75} />
        <Select
          size="small"
          pure
          onChange={switchThemes}
          value={isDark ? 'dark' : 'light'}
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
