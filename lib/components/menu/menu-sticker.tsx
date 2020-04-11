import React, { useEffect, useMemo } from 'react'
import { Tabs, useTheme } from 'components'
import useCurrentState from 'components/utils/use-current-state'
import Router from 'next/router'
import Metadatas from 'lib/data'
import useLocale from 'lib/use-locale'
import { useConfigs } from 'lib/config-context'

const MenuSticker = () => {
  const theme = useTheme()
  const { updateTabbarFixed } = useConfigs()
  const { tabbar: currentUrlTabValue, locale } = useLocale()
  const [tabValue, setTabValue, tabValueRef] = useCurrentState<string>('')
  const [fixed, setFixed, fixedRef] = useCurrentState<boolean>(false)

  const tabbarData = useMemo(() => Metadatas[locale], [locale])

  useEffect(() => updateTabbarFixed(fixed), [fixed])
  useEffect(() => setTabValue(currentUrlTabValue), [currentUrlTabValue])
  useEffect(() => {
    const scrollHandler = () => {
      const shouldFixed = document.documentElement.scrollTop > 60
      if (shouldFixed === fixedRef.current) return
      setFixed(shouldFixed)
    }
    document.addEventListener('scroll', scrollHandler)
    return () => document.removeEventListener('scroll', scrollHandler)
  }, [])

  useEffect(() => {
    const shouldRedirectDefaultPage = currentUrlTabValue !== tabValueRef.current
    if (!shouldRedirectDefaultPage) return
    const defaultPath = `/${locale}/${tabValueRef.current}`
    Router.push(defaultPath)
  }, [tabValue, currentUrlTabValue])

  return (
    <>
      <div className={`nav-fill ${fixed ? 'active' : ''}`} />
      <nav className={fixed ? 'fixed' : ''}>
        <div className="sticker">
          <div className="inner">
            <Tabs value={tabValue} onChange={val => setTabValue(val)}>
              {tabbarData ? tabbarData.map((tab, index) => (
                <Tabs.Item label={tab.localeName || tab.name}
                  value={tab.name}
                  key={`${tab.localeName || tab.name}-${index}`} />
              )) : null}
            </Tabs>
          </div>
        </div>
      </nav>
      <style jsx>{`
        .nav-fill {
          width: 0;
          height: 0;
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }
        
        .nav-fill.active {
          height: 48px;
          visibility: visible;
        }

        nav {
          position: relative;
          width: 100%;
          height: 48px;
          background-color: ${theme.palette.background};
        }
        
        nav.fixed {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 3000;
          background-color: ${theme.palette.background};
          box-shadow: rgba(0, 0, 0, 0.1) 0 0 15px 0;
        }

        .sticker {
          position: relative;
          height: 100%;
          width: 100%;
        }
        
        .sticker:before {
          position: absolute;
          content: '';
          height: 1px;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: ${theme.palette.border};
        }
        
        .inner {
          max-width: ${theme.layout.pageWidth};
          padding: 0 ${theme.layout.gap};
          width: 100%;
          display: flex;
          align-items: flex-end;
          height: 100%;
          overflow: auto;
          z-index: 1000;
          margin: 0 auto;
        }
        
        .inner :global(.content) {
          display: none;
        }
        
        .inner :global(.tabs), .inner :global(header) {
          height: 100%;
          border: none;
        }
        
        .inner :global(.tab) {
          height: calc(100% - 2px);
          padding-top: 0;
          padding-bottom: 0;
          color: ${theme.palette.accents_5};
          font-size: .875rem;
        }
        
        .inner :global(.tab):hover {
          color: ${theme.palette.foreground};
        }
        
        .inner :global(.active) {
          color: ${theme.palette.foreground};
        }
      `}</style>
    </>
  )
}

export default MenuSticker
