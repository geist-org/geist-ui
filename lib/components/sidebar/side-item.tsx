import React, { useState, ReactElement, useCallback } from 'react'
import ActiveLink from './active-link'
import ArrowIcon from '../icons/arrow'
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

const getChildrenHeight = (children?: Sides | Array<Sides>) => {
  if (!children || !Array.isArray(children)) return 0
  return children.length * 36
}

const SideItem: React.FC<React.PropsWithChildren<SideItemProps>> = React.memo(({
  children, sides,
}) => {
  const theme = useTheme()
  const [childrenActived, setChildrenActived] = useState<Array<boolean>>(() => sides.map(() => true))
  
  const next = useCallback((index) => {
    setChildrenActived(childrenActived.map((bool, i) => index !== i ? bool : !bool))
  }, [childrenActived])
  
  return (
    <>
      {sides.map((side, index) => {
        const childrenHeight = getChildrenHeight(side.children)
        const isActived = childrenActived[index]
  
        return (
          <div key={`${side.name}-${index}`} className="item">
            <div className="link">
              {side.children && <div className="icon"><ArrowIcon rotate={isActived? 90 : 0}/></div>}
              {
                !side.url
                  ? <ActiveCatalog name={side.name} onClick={() => next(index)} />
                  : (
                    <ActiveLink href={side.url} index={index} total={sides.length}>
                      <a>{side.name}</a>
                    </ActiveLink>
                  )
              }
            </div>
            {side.children && <div className="children" style={{ height: isActived ? childrenHeight + 'px' : 0 }}>
              <span className="line" />
              {React.cloneElement(children as ReactElement, {
                sides: side.children,
              })}
            </div>}
          </div>
        )
      })}
      <style jsx>{`
        .item {
          display: flex;
          flex: 1;
          flex-direction: column;
          justify-content: center;
        }
        
        .link {
          color: ${theme.palette.accents_5};
          display: flex;
          height: 36px;
          align-items: center;
          cursor: pointer;
          text-transform: capitalize;
        }
        
        .link :global(a) {
          color: ${theme.palette.accents_6};
          padding-left: .7rem;
          font-size: 14px;
        }
        
        .link :global(a.active) {
          color: ${theme.palette.success};
        }
        
        .icon {
          margin-right: 10px;
          margin-left: 5px;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          user-select: none;
        }
        
        .children {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-direction: column;
          margin-left: ${theme.layout.gapHalf};
          padding-left: ${theme.layout.gap};
          overflow: hidden;
          transition: all .2s ease-in-out;
          position: relative;
        }
        
        .active-title {
          font-weight: bold;
        }
        
        .line {
          position: absolute;
          top: 14px;
          left: 1px;
          bottom: 9px;
          width: 1px;
          background-color: ${theme.palette.accents_2};
        }
      `}</style>
    </>
  )
})

export default SideItem
