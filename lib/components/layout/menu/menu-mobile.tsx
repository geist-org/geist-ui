import React, { useMemo } from 'react'
import NextLink from 'next/link'
import { useTheme } from 'components'
import Metadata from 'lib/data'
import useLocale from 'lib/use-locale'
import { useConfigs } from 'lib/config-context'
import { Sides } from '../sidebar/side-item'
import ChevronRightIcon from '@geist-ui/icons/chevronRight'
import { useRouter } from 'next/router'

interface Props {
  expanded: boolean
}

const MenuMobile: React.FC<Props> = ({ expanded }) => {
  const theme = useTheme()
  const { pathname } = useRouter()
  const { isChinese } = useConfigs()
  const { locale } = useLocale()
  const menuData = useMemo(() => Metadata[locale], [locale])
  const [expandedGroupName, setExpandedGroupName] = React.useState<string | null>(null)

  const handleGroupClick = (name: string) => {
    setExpandedGroupName(expandedGroupName === name ? null : name)
  }

  if (!expanded) return null

  return (
    <div className="mobile-menu">
      <div className="content">
        <NextLink href={`/${locale}`}>
          <a className={`menu-item fadein ${pathname === `/${locale}` ? 'active' : ''}`}>
            {isChinese ? '主页' : 'Home'}
          </a>
        </NextLink>

        {menuData.map((group, index) => (
          <div
            key={group.name}
            className="fadein"
            style={{ animationDelay: `${(index + 1) * 50}ms` }}>
            <button
              className={`menu-item ${expandedGroupName === group.name && 'expanded'}`}
              onClick={() => handleGroupClick(group.name)}>
              <ChevronRightIcon
                size="1rem"
                strokeWidth={2}
                color={theme.palette.accents_4}
              />
              {group.name}
            </button>
            {expandedGroupName === group.name && (
              <div className="group">
                {(group.children as Array<Sides>).map(section => (
                  <div key={section.name}>
                    <span className="section-name">{section.name}</span>
                    {(section.children as Array<Sides>).map(item => (
                      <NextLink href={item.url || '/'} key={item.url}>
                        <a
                          className={`section-item ${
                            pathname === item.url ? 'active' : ''
                          }`}>
                          {item.name}
                        </a>
                      </NextLink>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        .mobile-menu {
          position: fixed;
          top: var(--geist-page-nav-height);
          height: calc(100vh - var(--geist-page-nav-height));
          width: 100vw;
          overflow-y: auto;
          z-index: 999;
          box-sizing: border-box;
          background-color: ${theme.palette.background};
          overflow-y: auto;
        }
        .fadein {
          animation: fadeIn 200ms ease;
          animation-fill-mode: forwards;
          opacity: 0;
        }
        .menu-item {
          padding: 0 ${theme.layout.gapHalf};
          margin: 0 ${theme.layout.gap};
          height: 48px;
          width: 100%;
          display: flex;
          align-items: center;
          border: none;
          background: none;
          outline: none;
          border-bottom: 1px solid ${theme.palette.accents_2};
          text-transform: capitalize;
          color: ${theme.palette.accents_6};
          cursor: pointer;
        }
        .menu-item :global(svg) {
          transform: translateX(${theme.layout.gapQuarterNegative});
          transition: transform 250ms ease;
        }
        .menu-item.expanded {
          border-bottom: none;
        }
        .menu-item.expanded :global(svg) {
          transform: rotate(90deg) translateY(${theme.layout.gapQuarter});
        }
        .group {
          background: ${theme.palette.accents_1};
          padding: 0 calc(${theme.layout.gap} * 1.5) ${theme.layout.gap};
          border-top: 1px solid ${theme.palette.accents_2};
        }
        .section-name {
          display: block;
          font-size: 0.75rem;
          text-transform: uppercase;
          color: ${theme.palette.accents_5};
          margin-top: ${theme.layout.gap};
          margin-bottom: ${theme.layout.gapHalf};
        }
        .section-item {
          padding: ${theme.layout.gapQuarter} ${theme.layout.gap};
          margin: 0 ${theme.layout.gapQuarter};
          width: 100%;
          display: flex;
          align-items: center;
          border: none;
          background: none;
          outline: none;
          color: ${theme.palette.accents_6};
          border-left: 1px solid ${theme.palette.accents_2};
        }
        .active {
          color: ${theme.palette.link};
          font-weight: 500;
        }
        @keyframes fadeIn {
          from {
            transform: translate3d(0, 0.375rem, 0);
            opacity: 0;
          }
          to {
            transform: translate3d(0, 0, 0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}

export default MenuMobile
