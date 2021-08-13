import React, { useMemo } from 'react'
import { pickChild } from '../utils/collections'
import { tuple } from '../utils/prop-types'
import Badge from './badge'

const placement = tuple('topLeft', 'topRight', 'bottomLeft', 'bottomRight')

export type BadgeAnchorPlacement = typeof placement[number]

interface Props {
  placement?: BadgeAnchorPlacement
  className?: string
}

const defaultProps = {
  placement: 'topRight' as BadgeAnchorPlacement,
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type BadgeAnchorProps = Props & NativeAttrs

type TransformStyles = {
  top?: string
  bottom?: string
  left?: string
  right?: string
  value: string
  origin: string
}

const getTransform = (placement: BadgeAnchorPlacement): TransformStyles => {
  const styles: { [key in BadgeAnchorPlacement]: TransformStyles } = {
    topLeft: {
      top: '0',
      left: '0',
      value: 'translate(-50%, -50%)',
      origin: '0% 0%',
    },
    topRight: {
      top: '0',
      right: '0',
      value: 'translate(50%, -50%)',
      origin: '100% 0%',
    },
    bottomLeft: {
      left: '0',
      bottom: '0',
      value: 'translate(-50%, 50%)',
      origin: '0% 100%',
    },
    bottomRight: {
      right: '0',
      bottom: '0',
      value: 'translate(50%, 50%)',
      origin: '100% 100%',
    },
  }
  return styles[placement]
}

const BadgeAnchor: React.FC<React.PropsWithChildren<BadgeAnchorProps>> = ({
  children,
  placement,
}: BadgeAnchorProps & typeof defaultProps) => {
  const [withoutBadgeChildren, badgeChldren] = pickChild(children, Badge)
  const { top, bottom, left, right, value, origin } = useMemo(
    () => getTransform(placement),
    [placement],
  )

  return (
    <div className="anchor">
      {withoutBadgeChildren}
      <sup>{badgeChldren}</sup>

      <style jsx>{`
        .anchor {
          position: relative;
          display: inline-flex;
          vertical-align: middle;
          flex-shrink: 0;
          box-sizing: border-box;
        }

        sup {
          position: absolute;
          top: ${top || 'auto'};
          left: ${left || 'auto'};
          right: ${right || 'auto'};
          bottom: ${bottom || 'auto'};
          transform: ${value};
          transform-origin: ${origin};
          z-index: 1;
        }
      `}</style>
    </div>
  )
}

BadgeAnchor.defaultProps = defaultProps
BadgeAnchor.displayName = 'GeistBadgeAnchor'
export default BadgeAnchor
