import React, { PropsWithChildren, ReactNode, useMemo, useRef } from 'react'
import useTheme from '../styles/use-theme'
import { WindowContainer } from './window-container'
import { WindowHeader } from './window-header'
import { BrowserBar } from './browser-bar'
import { WindowTabs } from './window-tabs'
import { defaultWindowContext, WindowContext } from './window-context'
import useRealShape from '../utils/use-real-shape'

type Props = {
  height?: string|number
  width?: string|number
  headerHeight?: string|number
  title?: string
  url?: string
  selected?: string
  tabs?: Tab[]
}
type Tab = { title: string; value: string }
type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>

const Window: React.FC<PropsWithChildren<Props & NativeAttrs>> = ({
  title,
  height,
  width,
  headerHeight,
  url,
  tabs,
  selected,
  children,
  ...nativeAttrs
}) => {
  const theme = useTheme()
  const windowConfig = {
    height: height ?? defaultWindowContext.height,
    width: width ?? defaultWindowContext.width,
    headerHeight: headerHeight ?? defaultWindowContext.headerHeight,
  }
  const headerDivRef = useRef<HTMLDivElement>(null)
  const [shape] = useRealShape(headerDivRef)
  return (
    <WindowContext.Provider value={windowConfig}>
      <WindowContainer nativeAttrs={nativeAttrs}>
        <WindowHeader headerRef={headerDivRef}>
          {useMemo<ReactNode>(() => {
            if (title && !url && !tabs) {
              return <div className="window-title">{title}</div>
            } else if (url) {
              return (
                <div className="window-title">
                  <BrowserBar url={url} />
                </div>
              )
            } else if (tabs) {
              return (
                <div className="window-tabs">
                  <WindowTabs headerHeight={shape.height} tabs={tabs} selected={selected} />
                </div>
              )
            } else {
              return null
            }
          }, [title, url, tabs, selected, shape, width, headerHeight])}
        </WindowHeader>
        <div className="window-body">{children}</div>
        <style jsx>{`
          .window-title {
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            height: ${headerHeight}px;
            left: 0;
            width: 100%;
          }
          .window-body {
            flex: 1 1;
            width: 100%;
            padding-top: ${theme.layout.gapHalf};
            overflow: auto;
          }
          .window-tabs {
            display: flex;
            position: absolute;
            left: 80px;
            font-size: 12px;
            bottom: -1px;
          }
        `}</style>
      </WindowContainer>
    </WindowContext.Provider>
  )
}
export default Window
