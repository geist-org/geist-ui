import React, { useEffect, useState } from 'react'
import PageHeader from './header'
import { useTheme, useBodyScroll } from 'components'
import Sidebar, { TabbarMobile } from './sidebar'
import { useConfigs } from '../../config-context'

export interface Meta {
  title: string
}

export interface LayoutProps {
  meta: Meta
  getStaticProps?: any
}

export const Layout: React.FC<React.PropsWithChildren<LayoutProps>> = React.memo(
  ({ children, meta }) => {
    const theme = useTheme()
    const [showAfterRender, setShowAfterRender] = useState<boolean>(false)
    const { tabbarFixed } = useConfigs()
    const [, setBodyScroll] = useBodyScroll(null, { scrollLayer: true })
    const [expanded, setExpanded] = useState<boolean>(false)
    const mobileTabbarClickHandler = () => {
      setExpanded(!expanded)
      setBodyScroll(!expanded)
    }

    useEffect(() => setShowAfterRender(true), [])

    if (!showAfterRender)
      return (
        <section>
          <PageHeader meta={meta} />
          {children}
          <style jsx>{`
            section {
              display: none;
              opacity: 0;
            }
          `}</style>
        </section>
      )
    return (
      <div className="layout">
        <PageHeader meta={meta} />
        <TabbarMobile onClick={mobileTabbarClickHandler} />
        <aside className="sidebar">
          <Sidebar />
        </aside>
        <div className="side-shadow" />
        <main className="main">
          <div>{children}</div>
        </main>
        <style jsx global>{`
          .layout h3 {
            margin-top: 40px;
          }
          .layout h4 {
            margin-top: 25px;
          }
          .layout ol {
            padding-left: 40px;
            margin: 25px auto;
            transform: scale(0.95);
          }
        `}</style>
        <style jsx>{`
          .layout {
            min-height: calc(100vh - 108px);
            max-width: ${theme.layout.pageWidthWithMargin};
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
            height: calc(100% - 2rem - 140px + ${tabbarFixed ? '60px' : 0});
            position: fixed;
            top: 140px;
            bottom: 2rem;
            transform: translateY(${tabbarFixed ? '-60px' : 0});
            transition: transform 200ms ease-out;
            z-index: 100;
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
          @media only screen and (max-width: ${theme.layout.breakpointMobile}) {
            .layout {
              max-width: 100%;
              width: 100%;
              padding: 20px 1rem;
            }
            .sidebar {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              z-index: 10;
              width: 100vw;
              box-sizing: border-box;
              height: ${expanded ? '100vh' : '0'};
              background-color: ${theme.palette.background};
              padding: var(--geist-page-nav-height) 0 0 0;
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
  },
)

export default Layout
