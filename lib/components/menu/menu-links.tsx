import React from 'react'
import { useTheme } from 'components'
import Controls from 'lib/components/controls'


const MenuLinks = () => {
  const theme = useTheme()
  return (
    <nav>
      <div className="site-name">
        <h3>ZEIT UI - React</h3>
      </div>
      <div className="links">
        <Controls />
      </div>
      <style jsx>{`
        nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1000px;
          user-select: none;
          position: relative;
          margin: 0 auto;
          padding: 0 ${theme.layout.gap};
          height: 60px;
        }
      `}</style>
    </nav>
  )
}

export default MenuLinks
