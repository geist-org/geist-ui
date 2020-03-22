import React from 'react'
import { withRouter, Router } from 'next/router'
import { useTheme } from 'components/index'
import Sidebar from './sidebar'
import Controls from 'lib/components/controls'
import sides from 'lib/data/metadata.json'

export interface Meta {
  title: string
  description: string
  editUrl?: string
}

export interface Props {
  router: Router
}

export const Layout: React.FC<React.PropsWithChildren<Props>> = React.memo(({ children }) => {
  const theme = useTheme()
  
  return (
    <div className="layout">
      <aside className="sidebar">
        <Controls />
        <Sidebar sides={sides}/>
      </aside>
      <div className="side-shadow" />
      <main className="main">
        <div>{children}</div>
      </main>

      <style jsx>{`
        .layout {
          min-height: 100vh;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 ${theme.layout.gap};
          display: flex;
        }
        
        .sidebar {
          width: 200px;
          margin-right: 50px;
          -webkit-overflow-scrolling: touch;
          -webkit-flex-shrink: 0;
          height: 100%;
          position: fixed;
        }
        
        .side-shadow {
          width: 250px;
          flex-shrink: 0;
          height: 100vh;
        }
        
        .main {
          display: flex;
          max-width: calc(100% - 250px);
          flex-direction: column;
          padding-left: 20px;
          padding-top: 25px;
          flex: 0 0 100%;
          padding-bottom: 150px;
        }
      `}</style>
    </div>
  )
})

export default withRouter(Layout)
