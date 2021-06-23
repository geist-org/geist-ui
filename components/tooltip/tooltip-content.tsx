import React, { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import useTheme from '../use-theme'
import usePortal from '../utils/use-portal'
import useResize from '../utils/use-resize'
import CssTransition from '../shared/css-transition'
import useClickAnyWhere from '../utils/use-click-anywhere'
import { getColors } from './styles'
import { getPosition, TooltipPosition, defaultTooltipPosition } from './placement'
import TooltipIcon from './tooltip-icon'
import { Placement, SnippetTypes } from '../utils/prop-types'
import useScaleable from '../use-scaleable'
import { getRect } from './helper'

interface Props {
  parent?: MutableRefObject<HTMLElement | null> | undefined
  placement: Placement
  type: SnippetTypes
  visible: boolean
  hideArrow: boolean
  offset: number
  className?: string
  iconOffset: TooltipIconOffset
}
export type TooltipIconOffset = {
  x: string
  y: string
}

const TooltipContent: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  parent,
  visible,
  offset,
  iconOffset,
  placement,
  type,
  className,
  hideArrow,
}) => {
  const theme = useTheme()
  const { SCALES } = useScaleable()
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
    <CssTransition visible={visible}>
      <div
        className={`tooltip-content ${className}`}
        ref={selfRef}
        onClick={preventHandler}>
        <div className="inner">
          {!hideArrow && <TooltipIcon placement={placement} shadow={hasShadow} />}
          {children}
        </div>
        <style jsx>{`
          .tooltip-content {
            --tooltip-icon-offset-x: ${iconOffset.x};
            --tooltip-icon-offset-y: ${iconOffset.y};
            --tooltip-content-bg: ${colors.bgColor};
            box-sizing: border-box;
            position: absolute;
            top: ${rect.top};
            left: ${rect.left};
            transform: ${rect.transform};
            background-color: var(--tooltip-content-bg);
            color: ${colors.color};
            border-radius: ${theme.layout.radius};
            padding: 0;
            z-index: 1000;
            box-shadow: ${hasShadow ? theme.expressiveness.shadowMedium : 'none'};
            width: ${SCALES.width(1, 'auto')};
            height: ${SCALES.height(1, 'auto')};
          }

          .inner {
            box-sizing: border-box;
            position: relative;
            font-size: ${SCALES.font(1)};
            padding: ${SCALES.pt(0.65)} ${SCALES.pr(0.9)} ${SCALES.pb(0.65)}
              ${SCALES.pl(0.9)};
            height: 100%;
          }
        `}</style>
      </div>
    </CssTransition>,
    el,
  )
}

export default TooltipContent
