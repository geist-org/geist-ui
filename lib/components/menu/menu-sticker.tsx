import React, { useEffect, useMemo } from 'react'
import { useMediaQuery, Tabs, useTheme } from 'components'
import useCurrentState from 'components/utils/use-current-state'
import Router from 'next/router'
import Metadatas from 'lib/data'
import useLocale from 'lib/use-locale'
import { useConfigs } from 'lib/config-context'

const MenuSticker = () => {
  const theme = useTheme()
  const { updateTabbarFixed, isChinese } = useConfigs()
  const { tabbar: currentUrlTabValue, locale } = useLocale()
  const [tabValue, setTabValue, tabValueRef] = useCurrentState<string>('')
  const [fixed, setFixed, fixedRef] = useCurrentState<boolean>(false)
  const isSM = useMediaQuery('sm', { match: 'down' })
  const isXS = useMediaQuery('xs', { match: 'down' })
  const isFixedTabs = fixed && !isXS

  const tabbarData = useMemo(() => Metadatas[locale], [locale])

  useEffect(() => updateTabbarFixed(isFixedTabs), [isFixedTabs])
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
      <div className={`nav-fill ${isFixedTabs ? 'active' : ''}`} />
      <nav className={isFixedTabs ? 'fixed' : ''}>
        <div className="sticker">
          <div className={`inner ${isSM && 'sm'}`}>
            <Tabs
              height="calc(var(--geist-page-tab-height) - 2px)"
              value={tabValue}
              onChange={val => setTabValue(val)}>
              <Tabs.Item
                height="calc(var(--geist-page-tab-height) - 2px)"
                font="14px"
                py={0}
                label={isChinese ? '主页' : 'Home'}
                value=""
              />
              {tabbarData
                ? tabbarData.map((tab, index) => (
                    <Tabs.Item
                      height="calc(var(--geist-page-tab-height) - 2px)"
                      font="14px"
                      py={0}
                      label={tab.localeName || tab.name}
                      value={tab.name}
                      key={`${tab.localeName || tab.name}-${index}`}
                    />
                  ))
                : null}
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
          background-color: ${theme.palette.background};
        }

        .nav-fill.active {
          height: var(--geist-page-tab-height);
          visibility: visible;
        }

        nav {
          position: relative;
          width: 100%;
          height: var(--geist-page-tab-height);
          background-color: ${theme.palette.background};
        }

        nav.fixed {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 999;
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
          box-sizing: border-box;
          width: ${theme.layout.pageWidth};
          height: 100%;
          z-index: 900;
          margin: 0 auto;
        }

        .inner.sm {
          width: 100%;
        }
        .inner.sm :global(.tab) {
          width: 33.333%;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          margin: 0;
        }
        .inner.sm :global(.tab.active) {
          background-color: ${theme.palette.accents_2};
        }

        .inner :global(.content) {
          display: none;
        }

        .inner :global(.scroll-container) {
          border-color: transparent;
        }

        .inner :global(.tab) {
          color: ${theme.palette.accents_5};
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
