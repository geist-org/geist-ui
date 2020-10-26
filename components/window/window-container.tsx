import React, { HTMLAttributes, PropsWithChildren } from 'react'
import useTheme from '../styles/use-theme'
import { useWindowContext } from './window-context'

export const WindowContainer: React.FC<PropsWithChildren<{ nativeAttrs: HTMLAttributes<any> }>> = ({
  children,
  nativeAttrs,
}) => {
  const theme = useTheme()
  const { height, width } = useWindowContext()
  return (
    <div className="window-container" {...nativeAttrs}>
      {children}
      <style jsx>{`
        .window-container {
          display: flex;
          flex-direction: column;
          box-shadow: ${theme.expressiveness.shadowLarge};
          border-radius: ${theme.layout.radius};
          overflow: hidden;
          max-width: 100%;
          height: ${typeof height === 'number' ? `${height}px` : height};
          width: ${typeof width === 'number' ? `${width}px` : width};
          position: relative;
          background-color: ${theme.palette.background};
          color: ${theme.palette.foreground};
        }
      `}</style>
    </div>
  )
}
