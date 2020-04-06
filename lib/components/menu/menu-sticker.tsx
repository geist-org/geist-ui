import React, { useEffect, useMemo } from 'react'
import { Tabs, useTheme } from 'components'
import useCurrentState from 'components/utils/use-current-state'
import sides from 'lib/data/metadata.json'
import { Sides } from 'lib/components/sidebar/side-item'
import Router, { useRouter } from 'next/router'
import { useConfigs } from '../../config-context'

export interface MultilLocaleMetaInformation {
  [key: string]: Sides[]
}

const MenuSticker = () => {
  const theme = useTheme()
  const { pathname } = useRouter()
  const { updateSides, updateTabbarFixed } = useConfigs()
  const [fixed, setFixed, fixedRef] = useCurrentState<boolean>(false)
  
  useEffect(() => updateTabbarFixed(fixed), [fixed])
  
  const tabbarData = useMemo(() => {
    const language = pathname
      .split('/')
      .filter(r => !!r)
    const locale: string = language[0] || 'en-us'
    return (sides as MultilLocaleMetaInformation)[locale]
  }, [pathname, sides])
  
  const currentTabValue = useMemo(() => {
    const language = pathname
      .split('/')
      .filter(r => !!r)
    return language[1]
  }, [pathname])

  useEffect(() => {
    const scrollHandler = () => {
      const shouldFixed = document.documentElement.scrollTop > 60
      if (shouldFixed === fixedRef.current) return
      setFixed(shouldFixed)
    }
    document.addEventListener('scroll', scrollHandler)
    return () => document.removeEventListener('scroll', scrollHandler)
  }, [])

  const tabChangeHandler = (value: string) => {
    const currentTab = tabbarData.find(tab => tab.name === value)
    if (!currentTab || !Array.isArray(currentTab.children)) return
    
    let firstChildren = currentTab.children
    if (Array.isArray(firstChildren[0].children)) {
      firstChildren = firstChildren[0].children
    }
    
    const defaultPath = firstChildren[0].url
    if (!defaultPath) return
    updateSides(currentTab.children)
    Router.push(defaultPath)
  }
  
  useEffect(() => {
    tabbarData && tabChangeHandler(currentTabValue)
  }, [tabbarData])

  return (
    <>
      <div className={`nav-fill ${fixed ? 'active' : ''}`} />
      <nav className={fixed ? 'fixed' : ''}>
        <div className="sticker">
          <div className="inner">
            <Tabs value={currentTabValue} onChange={tabChangeHandler}>
              {tabbarData ? tabbarData.map(tab => (
                <Tabs.Item label={tab.localeName || tab.name}
                  value={tab.name}
                  key={tab.name} />
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
          max-width: 1000px;
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
