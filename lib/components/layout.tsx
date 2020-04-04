import React, { useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { useTheme } from 'components'
import Controls from './controls'
import Sidebar from './sidebar'
import { Sides } from './sidebar/side-item'
import TabbarMobile from './sidebar/tabbar-mobile'
import useBodyScroll from 'components/utils/use-body-scroll'
import sides from 'lib/data/metadata.json'

export interface Meta {
  title: string
}

export interface Props {
  meta: Meta
  getStaticProps?: any
}

export interface MultilLocaleMetaInformation {
  [key: string]: Sides[]
}

export const Layout: React.FC<React.PropsWithChildren<Props>> = React.memo(({ children }) => {
  const theme = useTheme()
  const { pathname } = useRouter()
  const [, setBodyScroll] = useBodyScroll(null, { scrollLayer: true })
  const [expanded, setExpanded] = useState<boolean>(false)
  const mobileTabbarClickHandler = () => {
    setExpanded(!expanded)
    setBodyScroll(!expanded)
  }
  const sideData = useMemo(() => {
    const language = pathname
      .split('/')
      .filter(r => !!r)
    const locale: string = language[0] || 'en-us'
    return (sides as MultilLocaleMetaInformation)[locale]
  }, [pathname, sides])
  
  return (
    <div className="layout">
      <TabbarMobile onClick={mobileTabbarClickHandler} />
      <aside className="sidebar">
        <Controls />
        <Sidebar sides={sideData}/>
      </aside>
      <div className="side-shadow" />
      <main className="main">
        <div>{children}</div>
      </main>

      <style jsx>{`
        .layout {
          min-height: 100vh;
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 ${theme.layout.gap};
          display: flex;
          box-sizing: border-box;
        }
        
        .sidebar {
          width: 200px;
          margin-right: 20px;
          -webkit-overflow-scrolling: touch;
          -webkit-flex-shrink: 0;
          height: 100%;
          position: fixed;
        }
        
        .side-shadow {
          width: 220px;
          flex-shrink: 0;
          height: 100vh;
        }
        
        .main {
          display: flex;
          max-width: calc(100% - 220px);
          flex-direction: column;
          padding-left: 20px;
          padding-top: 25px;
          flex: 0 0 100%;
          padding-bottom: 150px;
        }
        
        @media only screen and (max-width: 767px) {
          .layout {
            max-width: 100%;
            width: 100%;
            padding: 5rem 1rem;
          }

          .sidebar {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 10;
            width: 100vw;
            height: ${expanded ? '100vh' : '0'};
            background-color: ${theme.palette.background};
            padding: 0;
            overflow: hidden;
            transition: height 250ms ease;
          }
          
          .main {
            width: 90vw;
            max-width: 90vw;
            padding: 0;
          }
          
          .side-shadow {
            display: none;
            visibility: hidden;
          }
        }
      `}</style>
    </div>
  )
})

export default Layout
