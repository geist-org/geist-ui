import React, { ReactElement } from 'react'
import ActiveLink from './active-link'
import ActiveCatalog from './active-catalog'
import { useTheme } from 'components'

export type Sides = {
  name: string
  url?: string
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
            {!side.url && <ActiveCatalog name={side.name} />}
            {side.url && (
              <div className="link">
                <ActiveLink href={side.url} index={index} total={sides.length}>
                  <a>{side.name}</a>
                </ActiveLink>
              </div>
            )}
            
            {side.children && <div className="children">
              {/*<span className="line" />*/}
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
          font-size: .9rem;
          padding: 0 ${theme.layout.gapQuarter};
          transition: color 200ms ease;
        }
        
        .link :global(a.active) {
          color: ${theme.palette.background};
          font-weight: 700;
          background-color: ${theme.palette.accents_7};
          text-transform: uppercase;
        }
        
        .children {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-direction: column;
          padding-left: ${theme.layout.gapHalf};
          transition: all .2s ease-in-out;
          position: relative;
          margin-top: .5rem;
        }
        
        .active-title {
          font-weight: bold;
        }
        
        @media only screen and (max-width: 767px) {
        
        }
      `}</style>
    </>
  )
})

export default SideItem
