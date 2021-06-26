import React from 'react'
import NextLink from 'next/link'
import { useTheme, Avatar } from 'components'
import Controls from 'lib/components/controls'
import { useConfigs } from 'lib/config-context'

const MenuLinks = () => {
  const theme = useTheme()
  const { isChinese } = useConfigs()

  return (
    <nav>
      <NextLink href={isChinese ? '/zh-cn' : '/en-us'}>
        <a className="menu__logo" aria-label="Go Home">
          <Avatar
            src="/images/logo.png"
            width="2rem"
            height="2rem"
            draggable={false}
            title="Logo"
          />
          Geist
        </a>
      </NextLink>
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

        .menu__logo {
          display: flex;
          flex-direction: row;
          align-items: center;
          font-size: 1.125rem;
          font-weight: 500;
          color: inherit;
        }

        .menu__logo :global(.avatar) {
          margin-right: ${theme.layout.gapHalf}!important;
        }
      `}</style>
    </nav>
  )
}

export default MenuLinks
