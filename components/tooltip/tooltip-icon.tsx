import React, { useMemo } from 'react'
import { getIconPosition } from './placement'
import { Placement } from '../utils/prop-types'
import useTheme from '../use-theme'

interface Props {
  placement: Placement
  shadow: boolean
}

const TooltipIcon: React.FC<Props> = ({ placement, shadow }) => {
  const theme = useTheme()
  const { transform, top, left, right, bottom } = useMemo(
    () =>
      getIconPosition(
        placement,
        'var(--tooltip-icon-offset-x)',
        'var(--tooltip-icon-offset-y)',
      ),
    [placement],
  )
  const bgColorWithDark = useMemo(() => {
    if (!shadow || theme.type !== 'dark') return 'var(--tooltip-content-bg)'
    return theme.palette.accents_2
  }, [theme.type, shadow])

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

export default TooltipIcon
