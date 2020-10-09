import React, { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import useTheme from '../styles/use-theme'
import usePortal from '../utils/use-portal'
import useResize from '../utils/use-resize'
import CSSTransition from '../shared/css-transition'
import useClickAnyWhere from '../utils/use-click-anywhere'
import { getColors } from './styles'
import { getPosition, TooltipPosition, defaultTooltipPosition } from './placement'
import TooltipIcon from './tooltip-icon'
import { Placement, SnippetColors } from '../utils/prop-types'

interface Props {
  parent?: MutableRefObject<HTMLElement | null> | undefined
  placement: Placement
  color: SnippetColors
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
  color,
  className,
  hideArrow,
}) => {
  const theme = useTheme()
  const el = usePortal('tooltip')
  const updateRectTimer = useRef<number>()
  const selfRef = useRef<HTMLDivElement>(null)
  const [rect, setRect] = useState<TooltipPosition>(defaultTooltipPosition)
  const [computedPlacement, setComputedPlacement] = useState<Placement>(placement)
  const colors = useMemo(() => getColors(color, theme.palette), [color, theme.palette])
  if (!parent) return null

  const updateRect = () => {
    const clear = () => {
      clearTimeout(updateRectTimer.current)
      updateRectTimer.current = undefined
    }

    const update = () => {
      const rect = getRect(parent)
      const contentRect = getRect(selfRef)

      let newPlacement
      /* istanbul ignore next */
      if (
        placement.includes('left') &&
        contentRect.left < 0 &&
        contentRect.right > contentRect.left
      ) {
        newPlacement = placement.replace('left', 'right')
      } else if (
        placement.includes('right') &&
        contentRect.right > document.documentElement.clientWidth
      ) {
        newPlacement = placement.replace('right', 'left')
      } else if (
        placement.includes('top') &&
        contentRect.top - document.documentElement.scrollTop < contentRect.height
      ) {
        newPlacement = placement.replace('top', 'bottom')
      } else if (
        placement.includes('bottom') &&
        contentRect.bottom - document.documentElement.scrollTop >
          document.documentElement.clientHeight
      ) {
        newPlacement = placement.replace('bottom', 'top')
      }
      const position = getPosition((newPlacement as Placement) || placement, rect, offset)
      setComputedPlacement((newPlacement as Placement) || placement)
      setRect(position)
      clear()
    }
    clear()
    updateRectTimer.current = window.setTimeout(update, 1)
  }

  useResize(updateRect)
  useClickAnyWhere(updateRect)

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
      <div className={`tooltip-content ${className}`} ref={selfRef} onClick={preventHandler}>
        <div className="inner">
          {!hideArrow && (
            <TooltipIcon placement={computedPlacement} bgColor={colors.bgColor} shadow={true} />
          )}
          {children}
        </div>
        <style jsx>{`
          .tooltip-content {
            position: absolute;
            width: auto;
            top: ${rect.top};
            left: ${rect.left};
            max-width: ${rect.maxWidth};
            min-width: 8rem;
            transform: ${rect.transform};
            background-color: ${colors.bgColor};
            color: ${colors.color};
            border-radius: ${theme.expressiveness.R2};
            padding: 0;
            z-index: 1000;
            box-shadow: ${theme.expressiveness.D2};
            visibility: hidden;
          }
          .tooltip-content.transition-enter.transition-enter-active {
            visibility: visible;
          }
          .tooltip-content.transition-leave {
            visibility: hidden;
          }

          .inner {
            padding: calc(${theme.layout.gapHalf} * 1.5);
            position: relative;
          }
        `}</style>
      </div>
    </CSSTransition>,
    el,
  )
}

export default TooltipContent
