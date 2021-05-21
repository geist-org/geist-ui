import React, { useEffect, useMemo, useState } from 'react'

import { GeistUIThemes } from '../themes/presets'
import { NormalTypes } from '../utils/prop-types'
import Star from '@geist-ui/react-icons/star'
import useTheme from '../use-theme'
import withDefaults from '../utils/with-defaults'

interface Props {
  type?: NormalTypes
  className?: string
  count?: 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  value?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  valueCallback?: React.Dispatch<React.SetStateAction<number>>
  lock?: boolean
  lockCallback?: React.Dispatch<React.SetStateAction<boolean>>
  onClick?: React.MouseEventHandler<SVGElement>
  onMouseEnter?: React.MouseEventHandler<SVGElement>
}

const defaultProps = {
  type: 'default' as NormalTypes,
  className: '',
  count: 5,
  value: 0,
  valueCallback: () => {},
  lock: false,
  lockCallback: () => {},
  onClick: () => {},
  onMouseEnter: () => {},
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type RatingProps = Props & typeof defaultProps & NativeAttrs

const getColor = (type: NormalTypes, theme: GeistUIThemes): string => {
  const colors: { [key in NormalTypes]?: string } = {
    default: theme.palette.foreground,
    success: theme.palette.success,
    warning: theme.palette.warning,
    error: theme.palette.error,
  }
  return colors[type] || (colors.default as string)
}

const Rating: React.FC = ({
  type,
  children,
  className,
  count,
  value,
  valueCallback,
  lock,
  lockCallback,
  onClick,
  onMouseEnter,
  ...props
}: RatingProps) => {
  const theme = useTheme()
  const color = useMemo(() => getColor(type, theme), [type, theme])
  const [hoverState, setHoverState] = useState<number>(value) // state is from 0 to count - 1
  const [isLocked, setIsLocked] = useState<boolean>(lock)

  useEffect(() => {
    valueCallback(hoverState + 1) // state + 1
  }, [hoverState])

  useEffect(() => {
    lockCallback(isLocked)
  }, [isLocked])

  const handleClick = (event: React.MouseEvent<SVGElement>) => {
    if (isLocked) {
      setIsLocked(false) // unlock
      onClick && onClick(event)
      return
    }
    setIsLocked(true) // lock
    onClick && onClick(event)
  }

  const handleMouseEnter = (event: React.MouseEvent<SVGElement>, index: number) => {
    if (isLocked) return // leave on lock
    setHoverState(index)
    onMouseEnter && onMouseEnter(event)
  }

  const render = () => {
    return (
      <>
        {[...Array(count)].map((_e, i) => (
          <Star
            key={i}
            color={color}
            className={`${className}`}
            fill={i <= hoverState ? color : 'transparent'}
            onMouseEnter={e => handleMouseEnter(e, i)}
            onClick={handleClick}
            {...props}>
            {children}
          </Star>
        ))}
      </>
    )
  }
  return render()
}

const MemoRating = React.memo(Rating)

export default withDefaults(MemoRating, defaultProps)
