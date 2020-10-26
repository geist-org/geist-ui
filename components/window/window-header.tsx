import React, { PropsWithChildren, RefObject } from 'react'
import useTheme from '../styles/use-theme'
import { WindowTraffic } from './window-traffic'
import { useWindowContext } from './window-context'

export const WindowHeader: React.FC<PropsWithChildren<{
  headerRef: RefObject<HTMLDivElement>
}>> = ({ children, headerRef }) => {
  const theme = useTheme()
  const { headerHeight } = useWindowContext()
  return (
    <div className="window-header" ref={headerRef}>
      <WindowTraffic style={{ marginLeft: theme.layout.gapHalf }} />
      {children}
      <style jsx>{`
        .window-header {
          display: flex;
          flex-basis: ${typeof headerHeight === 'number' ? `${headerHeight}px` : headerHeight};
          width: 100%;
          color: ${theme.palette.accents_5};
          align-items: center;
          position: relative;
          border-bottom: 1px solid ${theme.palette.accents_2};
        }
      `}</style>
    </div>
  )
}
