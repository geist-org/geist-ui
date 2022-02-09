import React, { ReactElement } from 'react'
import ActiveLink from './active-link'
import ActiveCatalog from './active-catalog'

export type Sides = {
  name: string
  url?: string
  localeName?: string
  children?: Sides | Array<Sides>
}

export interface SideItemProps {
  sides: Array<Sides>
}

const SideItem: React.FC<React.PropsWithChildren<SideItemProps>> = React.memo(
  ({ children, sides }) => {
    return (
      <>
        {sides.map((side, index) => {
          const showChildren = side.children && children
          return (
            <div key={`${side.localeName || side.name}-${index}`} className="item">
              {!side.url && (
                <ActiveCatalog name={side.name} localeName={side.localeName} />
              )}
              {side.url && <ActiveLink href={side.url} text={side.name} />}

              {showChildren && (
                <div className="children">
                  {React.cloneElement(children as ReactElement, {
                    sides: side.children,
                  })}
                </div>
              )}
            </div>
          )
        })}
        <style jsx>{`
          .item {
            width: 100%;
          }

          .children {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            flex-direction: column;
            transition: all 0.2s ease-in-out;
            position: relative;
            margin-top: 0.5rem;
          }

          .active-title {
            font-weight: bold;
          }
        `}</style>
      </>
    )
  },
)

export default SideItem
