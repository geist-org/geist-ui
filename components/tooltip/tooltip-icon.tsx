import React, { useMemo } from 'react'
import { getIconPosition } from './placement'
import { Placement } from '../utils/prop-types'

interface Props {
  placement: Placement
  bgColor: string
}

const TooltipIcon: React.FC<Props> = ({
  placement, bgColor,
}) => {
  const {
    transform, top, left, right, bottom,
  } = useMemo(() => getIconPosition(placement, 3), [placement])
  
  return (
    <span>
      <style jsx>{`
        span {
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 6px 7px 6px 0;
          border-color: transparent ${bgColor} transparent transparent;
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

export default TooltipIcon
