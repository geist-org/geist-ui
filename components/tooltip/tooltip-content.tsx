import React, { MutableRefObject, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import useTheme from '../styles/use-theme'
import usePortal from '../utils/use-portal'
import useResize from '../utils/use-resize'
import CSSTransition from '../shared/css-transition'
import useClickAnyWhere from '../utils/use-click-anywhere'
import { getPosition, TooltipPosition, defaultTooltipPosition } from './placement'
import TooltipIcon from './tooltip-icon'
import { Placement } from '../utils/prop-types'

interface Props {
  parent?: MutableRefObject<HTMLElement | null> | undefined
  placement: Placement
  visible: boolean
  offset: number
  bgColor: string
}

interface ReactiveDomReact {
  top: number
  bottom: number
  left: number
  right: number
  width: number
  height: number
}

const defaultRect: ReactiveDomReact = {
  top: -1000,
  left: -1000,
  right: -1000,
  bottom: -1000,
  width: 0,
  height: 0,
}

const getRect = (ref: MutableRefObject<HTMLElement | null>): ReactiveDomReact => {
  if (!ref || !ref.current) return defaultRect
  const rect = ref.current.getBoundingClientRect()
  return {
    ...rect,
    width: rect.width || (rect.right - rect.left),
    height: rect.height || (rect.bottom - rect.top),
    top: rect.top + document.documentElement.scrollTop,
    bottom: rect.bottom + document.documentElement.scrollTop,
    left: rect.left + document.documentElement.scrollLeft,
    right: rect.right + document.documentElement.scrollLeft,
  }
}

const TooltipContent: React.FC<React.PropsWithChildren<Props>> = React.memo(({
  children, parent, visible, offset, placement, bgColor,
}) => {
  const theme = useTheme()
  const el = usePortal('tooltip')
  const selfRef = useRef<HTMLDivElement>(null)
  const [rect, setRect] = useState<TooltipPosition>(defaultTooltipPosition)
  if (!parent) return null

  const updateRect = () => {
    const position = getPosition(placement, getRect(parent), offset)
    setRect(position)
  }

  useResize(updateRect)
  useClickAnyWhere(() => updateRect())

  const preventHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    event.preventDefault()
    event.nativeEvent.stopImmediatePropagation()
  }

  if (!el) return null
  return createPortal((
    <CSSTransition visible={visible}>
      <div className="tooltip-content" ref={selfRef}
        onClick={preventHandler}
        onMouseEnter={preventHandler}
        onMouseLeave={preventHandler}>
        <div className="inner">
          <TooltipIcon placement={placement} bgColor={bgColor} />
          {children}
        </div>
        <style jsx>{`
        .tooltip-content {
          position: absolute;
          width: auto;
          top: ${rect.top};
          left: ${rect.left};
          transform: ${rect.transform};
          background-color: ${bgColor};
          color: ${theme.palette.background};
          border-radius: ${theme.layout.radius};
          padding: 0;
          z-index: 1000;
        }
        
        .inner {
          padding: ${theme.layout.gapHalf} ${theme.layout.gap};
          position: relative;
        }
      `}</style>
      </div>
    </CSSTransition>
  ), el)
})

export default TooltipContent
