import React, { ReactElement } from 'react'
import ActiveLink from './active-link'
import ActiveCatalog from './active-catalog'
import { useTheme } from 'components'

export type Sides = {
  name: string
  url?: string
  localeName?: string
  children?: Sides | Array<Sides>
}

export interface SideItemProps {
  sides: Array<Sides>
}

const SideItem: React.FC<React.PropsWithChildren<SideItemProps>> = React.memo(({
  children, sides,
}) => {
  const theme = useTheme()

  return (
    <>
      {sides.map((side, index) => {
        return (
          <div key={`${side.name}-${index}`} className="item">
            {!side.url && <ActiveCatalog name={side.name} localeName={side.localeName} />}
            {side.url && (
              <div className="link">
                <ActiveLink href={side.url}><a>{side.name}</a></ActiveLink>
              </div>
            )}
            
            {side.children && <div className="children">
              {React.cloneElement(children as ReactElement, {
                sides: side.children,
              })}
            </div>}
          </div>
        )
      })}
      <style jsx>{`
        .item {
          width: 100%;
        }
        
        .link {
          width: 100%;
          color: ${theme.palette.accents_5};
          display: flex;
          height: 2.25rem;
          align-items: center;
          justify-content: flex-start;
          cursor: pointer;
          text-transform: capitalize;
        }

        .link :global(a) {
          color: ${theme.palette.accents_7};
          font-size: 1rem;
          transition: all 200ms ease;
          font-weight: 400;
        }
        
        .link :global(a.active) {
          color: ${theme.palette.success};
          font-weight: 600;
        }
        
        .children {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-direction: column;
          transition: all .2s ease-in-out;
          position: relative;
          margin-top: .5rem;
        }
        
        .active-title {
          font-weight: bold;
        }
        
        @media only screen and (max-width: 767px) {
          .link {
            border-bottom: 1px solid ${theme.palette.border};
            height: 3.5rem;
          }
        }
      `}</style>
    </>
  )
})

export default SideItem
