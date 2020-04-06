import React, { PropsWithChildren, useEffect, useRef } from 'react'
import Router from 'next/router'
import { useTheme, Spacer } from 'components'
import SideItem, { SideItemProps, Sides } from './side-item'
import { useConfigs } from 'lib/config-context'

export interface Props {
}

export type SideGroupProps = Props & SideItemProps

export type SideChildren = Sides | Array<Sides>

const areEqual = (
  preProps: Readonly<PropsWithChildren<SideGroupProps>>,
  nextProps: Readonly<PropsWithChildren<SideGroupProps>>,
): boolean => {
  return preProps.sides.length === nextProps.sides.length
}

export const SideGroup: React.FC<{ sides?: SideChildren }> = React.memo(({ sides }) => {
  if (!sides) return null
  sides = Array.isArray(sides) ? sides : [sides]
  return <SideItem sides={sides} />
})

export const Sidebar: React.FC<SideGroupProps> = React.memo(({ sides }) => {
  const theme = useTheme()
  const boxRef = useRef<HTMLDivElement>(null)
  const { sidebarScrollHeight, updateSidebarScrollHeight } = useConfigs()
  
  useEffect(() => {
    Router.events.on('routeChangeStart', () => {
      if (!boxRef.current) return
      updateSidebarScrollHeight(boxRef.current.scrollTop || 0)
    })
  }, [])
  
  useEffect(() => {
    if (!boxRef.current) return
    boxRef.current.scrollTo({ top: sidebarScrollHeight })
  }, [boxRef.current])

  return (
    <div ref={boxRef} className="sides box">
      <SideItem sides={sides}>
        <SideGroup />
      </SideItem>
      <Spacer />
      <style jsx>{`
        .sides {
          width: 100%;
          padding-bottom: ${theme.layout.gap};
        }
        
        .box {
          overflow-y: auto;
          overflow-x: hidden;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .box::-webkit-scrollbar {
          width: 0;
          background-color: transparent;
        }
        
        .box>:global(.item) {
          margin-bottom: ${theme.layout.gap};
        }
        
        @media only screen and (max-width: 767px) {
          .box {
            padding: calc(3.5 * ${theme.layout.gap}) 15vw;
            width: 100vw;
            height: 100%;
          }
        }
      `}</style>
    </div>
  )
}, areEqual)

export default Sidebar
