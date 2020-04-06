import React, { useCallback, useMemo } from 'react'
import { Button, useTheme, Select, Spacer } from 'components'
import { useConfigs } from 'lib/config-context'
import Router, { useRouter } from 'next/router'
import MoonIcon from './icons/moon'
import SunIcon from './icons/sun'

const Controls: React.FC<{}> = React.memo(({
}) => {
  const theme = useTheme()
  const { onChange, updateChineseState } = useConfigs()
  const { pathname } = useRouter()
  const currentLocaleText = useMemo(() => {
    return pathname.toLowerCase().includes('zh-cn') ? 'English' : '中文文档'
  }, [pathname])
  const isDark = useMemo(() => theme.type === 'dark', [theme.type])
  const switchThemes = (val: string) => {
    const isDark = val === 'dark'
    onChange && onChange(isDark)
  }

  const switchLanguages = useCallback(() => {
    const currentIsChinese = pathname.toLowerCase().includes('zh-cn')
    const nextPath = `/${currentIsChinese ? 'en-us' : 'zh-cn'}`
    updateChineseState(!currentIsChinese)
    Router.push(nextPath)
  }, [pathname])

  const redirectGithub = () => {
    if (typeof window !== 'undefined') {
      window.open('https://github.com/zeit-ui/react')
    }
  }

  return (
    <div className="controls">
      <div className="tools">
        <Button auto type="abort" size="small" onClick={redirectGithub}>Github</Button>
        <Spacer x={.25} />
        <Button auto type="abort" size="small" onClick={switchLanguages}>{currentLocaleText}</Button>
        <Spacer x={.75} />
        <Select size="small" pure onChange={switchThemes} initialValue={isDark ? 'dark' : 'light'}>
          <Select.Option value="light">
            <div className="select-content">
              <SunIcon width={16} height={16} /> Light
            </div>
          </Select.Option>
          <Select.Option value="dark">
            <div className="select-content">
              <MoonIcon width={16} height={16} /> Dark
            </div>
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
          display: inline-flex;
          justify-content: center;
          align-items: center;
        }
        
        .select-content :global(svg) {
          margin-right: .5rem;
        }
        
        .tools {
          display: flex;
          height: 2.5rem;
          box-sizing: border-box;
          align-items: center;
        }
        
        @media only screen and (max-width: 767px) {
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
