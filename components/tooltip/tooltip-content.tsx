import React, { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import useTheme from '../use-theme'
import usePortal from '../utils/use-portal'
import useResize from '../utils/use-resize'
import CSSTransition from '../shared/css-transition'
import useClickAnyWhere from '../utils/use-click-anywhere'
import { getColors } from './styles'
import { getPosition, TooltipPosition, defaultTooltipPosition } from './placement'
import TooltipIcon from './tooltip-icon'
import { Placement, SnippetTypes } from '../utils/prop-types'

interface Props {
  parent?: MutableRefObject<HTMLElement | null> | undefined
  placement: Placement
  type: SnippetTypes
  visible: boolean
  hideArrow: boolean
  offset: number
  className?: string
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
    width: rect.width || rect.right - rect.left,
    height: rect.height || rect.bottom - rect.top,
    top: rect.top + document.documentElement.scrollTop,
    bottom: rect.bottom + document.documentElement.scrollTop,
    left: rect.left + document.documentElement.scrollLeft,
    right: rect.right + document.documentElement.scrollLeft,
  }
}

const TooltipContent: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  parent,
  visible,
  offset,
  placement,
  type,
  className,
  hideArrow,
}) => {
  const theme = useTheme()
  const el = usePortal('tooltip')
  const selfRef = useRef<HTMLDivElement>(null)
  const [rect, setRect] = useState<TooltipPosition>(defaultTooltipPosition)
  const colors = useMemo(() => getColors(type, theme.palette), [type, theme.palette])
  const hasShadow = type === 'default'
  if (!parent) return null

  const updateRect = () => {
    const position = getPosition(placement, getRect(parent), offset)
    setRect(position)
  }

  useResize(updateRect)
  useClickAnyWhere(() => updateRect())

  useEffect(() => {
    updateRect()
  }, [visible])

  const preventHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    event.nativeEvent.stopImmediatePropagation()
  }

  if (!el) return null
  return createPortal(
    <CSSTransition visible={visible}>
      <div
        className={`tooltip-content ${className}`}
        ref={selfRef}
        onClick={preventHandler}>
        <div className="inner">
          {!hideArrow && (
            <TooltipIcon
              placement={placement}
              bgColor={colors.bgColor}
              shadow={hasShadow}
            />
          )}
          {children}
        </div>
        <style jsx>{`
          .tooltip-content {
            position: absolute;
            width: auto;
            top: ${rect.top};
            left: ${rect.left};
            transform: ${rect.transform};
            background-color: ${colors.bgColor};
            color: ${colors.color};
            border-radius: ${theme.layout.radius};
            padding: 0;
            z-index: 1000;
            box-shadow: ${hasShadow ? theme.expressiveness.shadowMedium : 'none'};
          }

          .inner {
            padding: ${theme.layout.gapHalf} ${theme.layout.gap};
            position: relative;
          }
        `}</style>
      </div>
    </CSSTransition>,
    el,
  )
}

export default TooltipContent
