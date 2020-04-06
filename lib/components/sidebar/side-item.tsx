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
          <div key={`${side.localeName || side.name}-${index}`} className="item">
            {!side.url && <ActiveCatalog name={side.name} localeName={side.localeName} />}
            {side.url && <ActiveLink href={side.url} text={side.name} />}
            
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
