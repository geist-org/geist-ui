import React, { useMemo } from 'react'
import { getIconPosition } from './placement'
import { Placement } from '../utils/prop-types'
import useTheme from '../use-theme'

interface Props {
  placement: Placement
  bgColor: string
  shadow: boolean
}

const TooltipIcon: React.FC<Props> = ({ placement, bgColor, shadow }) => {
  const theme = useTheme()
  const { transform, top, left, right, bottom } = useMemo(() => getIconPosition(placement, 3), [
    placement,
  ])
  const bgColorWithDark = useMemo(() => {
    if (!shadow || theme.type !== 'dark') return bgColor
    return theme.palette.accents_2
  }, [theme.type, bgColor, shadow])

  return (
    <span>
      <style jsx>{`
        span {
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 6px 7px 6px 0;
          border-color: transparent ${bgColorWithDark} transparent transparent;
          position: absolute;
          left: ${left};
          top: ${top};
          right: ${right};
          bottom: ${bottom};
          transform: ${transform};
        }
      `}</style>
    </span>
  )
}

export default React.memo(TooltipIcon)
