import React, { useEffect, useMemo, useState } from 'react'

import { GeistUIThemes } from '../themes/presets'
import { NormalTypes } from '../utils/prop-types'
import Star from '@geist-ui/react-icons/star'
import useTheme from '../use-theme'
import withDefaults from '../utils/with-defaults'

interface Props {
  type?: NormalTypes
  className?: string
  icon?: JSX.Element
  count?: 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  value?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  onValueChange?: (value: number) => void
  locked?: boolean
  onLockedChange?: (locked: boolean) => void
  onClick?: React.MouseEventHandler<SVGElement>
  onMouseEnter?: React.MouseEventHandler<SVGElement>
}

const defaultProps = {
  type: 'default' as NormalTypes,
  className: '',
  icon: (props: any): JSX.Element => <Star {...props} />,
  count: 5,
  value: 0,
  locked: false,
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

const Rating: React.FC<React.PropsWithChildren<RatingProps>> = ({
  type,
  children,
  className,
  icon,
  count,
  value,
  onValueChange,
  locked,
  onLockedChange,
  onClick,
  onMouseEnter,
  ...props
}) => {
  const theme = useTheme()
  const color = useMemo(() => getColor(type, theme), [type, theme])
  const [hoverState, setHoverState] = useState<number>(value)
  const [isLocked, setIsLocked] = useState<boolean>(locked)

  useEffect(() => {
    if (!onValueChange) return
    onValueChange(hoverState + 1)
  }, [hoverState])

  useEffect(() => {
    if (!onLockedChange) return
    onLockedChange(isLocked)
  }, [isLocked])

  const handleMouseUp = (event: React.MouseEvent<SVGElement>, index: number) => {
    if (isLocked) {
      setIsLocked(false)
      onClick && onClick(event)
      return
    }
    setHoverState(index)
    setIsLocked(true)
    onClick && onClick(event)
  }

  const handleMouseEnter = (event: React.MouseEvent<SVGElement>, index: number) => {
    if (isLocked) return
    setHoverState(index)
    onMouseEnter && onMouseEnter(event)
  }

  const Icon = icon

  return (
    <>
      {[...Array(count)].map((_e, i) => (
        <Icon
          key={i}
          color={color}
          className={`${className}`}
          fill={i <= hoverState ? color : 'transparent'}
          stroke={i <= hoverState ? '#fff' : color}
          transform={i <= hoverState ? 'scale(1.1)' : 'scale(1)'}
          onMouseEnter={(e: React.MouseEvent<SVGElement, MouseEvent>) =>
            handleMouseEnter(e, i)
          }
          onMouseUp={(e: React.MouseEvent<SVGElement, MouseEvent>) => handleMouseUp(e, i)}
          {...props}>
          {children}
        </Icon>
      ))}
    </>
  )
}

const MemoRating = React.memo(Rating)

export default withDefaults(MemoRating, defaultProps)
