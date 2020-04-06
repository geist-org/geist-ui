import React from 'react'
import Router from 'next/router'
import { useTheme } from 'components'
import Controls from 'lib/components/controls'
import LogoIcon from 'lib/components/icons/logo'
import { useConfigs } from '../../config-context'


const MenuLinks = () => {
  const theme = useTheme()
  const { isChinese } = useConfigs()
  const goHome = () => {
    const home = isChinese ? '/zh-cn' : '/en-us'
    Router.push(home)
  }

  return (
    <nav>
      <div className="site-name">
        <span title={isChinese ? '回到主页' : 'Go Home'} onClick={goHome}>
          <LogoIcon />
        </span>
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
        
        .site-name {
          display: flex;
          align-items: center;
        }
      `}</style>
    </nav>
  )
}

export default MenuLinks
