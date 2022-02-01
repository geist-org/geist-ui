import React, { useMemo, useRef } from 'react'
import { isUnplacedRect, ReactiveDomReact } from '../utils/layouts'
import usePrevious from '../utils/use-previous'
import useTheme from '../use-theme'

export type HighlightProps = {
  rect: ReactiveDomReact
  visible?: boolean
  hoverHeightRatio?: number
  hoverWidthRatio?: number
}

type HighlightPosition = {
  width: string
  left: string
  height: string
  top: string
  transition: string
}

const Highlight: React.FC<HighlightProps> = ({
  rect,
  visible,
  hoverHeightRatio = 1,
  hoverWidthRatio = 1,
  ...props
}) => {
  const theme = useTheme()
  const ref = useRef<HTMLDivElement | null>(null)
  const isFirstVisible = usePrevious<boolean>(isUnplacedRect(rect))
  const position = useMemo<HighlightPosition>(() => {
    const width = rect.width * hoverWidthRatio
    const height = rect.height * hoverHeightRatio
    return {
      width: `${width}px`,
      left: `${rect.left + (rect.width - width) / 2}px`,
      height: `${height}px`,
      top: `${rect.elementTop + (rect.height - height) / 2}px`,
      transition: isFirstVisible ? 'opacity' : 'opacity, width, left',
    }
  }, [rect, hoverWidthRatio, hoverHeightRatio])

  return (
    <div ref={ref} className="highlight" {...props}>
      <style jsx>{`
        .highlight {
          background: ${theme.palette.accents_2};
          position: absolute;
          border-radius: 5px;
          width: ${position.width};
          left: ${position.left};
          height: ${position.height};
          top: ${position.top};
          opacity: ${visible ? 0.8 : 0};
          transition: 0.15s ease;
          transition-property: ${position.transition};
        }
      `}</style>
    </div>
  )
}

export default Highlight
