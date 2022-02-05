import React, { useEffect, useMemo } from 'react'
import { useMediaQuery, Tabs, useTheme, useCurrentState } from 'components'
import Router from 'next/router'
import Metadata from 'lib/data'
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

  const tabbarData = useMemo(() => Metadata[locale], [locale])

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
              leftSpace={0}
              activeClassName="current"
              align="center"
              hideDivider
              hideBorder
              onChange={val => setTabValue(val)}>
              <Tabs.Item font="14px" label={isChinese ? '主页' : 'Home'} value="" />
              {tabbarData
                ? tabbarData.map((tab, index) => (
                    <Tabs.Item
                      font="14px"
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
        // .sticker :global(.tab) {
        //   color: ${theme.palette.accents_3};
        // }
        // .sticker :global(.tab:hover) {
        //   color: ${theme.palette.accents_6};
        // }
        // .sticker :global(.current) {
        //   color: ${theme.palette.foreground};
        //   font-weight: 500;
        // }
        //.sticker :global(.current::after) {
        //  display: none;
        //}
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
        .inner :global(.content) {
          display: none;
        }
        //.inner :global(.scroll-container) {
        //  border-color: transparent;
        //  justify-content: center;
        //}
      `}</style>
    </>
  )
}

export default MenuSticker
