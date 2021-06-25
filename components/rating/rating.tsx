import React, { useEffect, useMemo, useState } from 'react'
import { GeistUIThemesPalette } from '../themes'
import { NormalTypes } from '../utils/prop-types'
import Star from '@geist-ui/react-icons/star'
import useTheme from '../use-theme'
import useScaleable, { withScaleable } from '../use-scaleable'

export type RatingTypes = NormalTypes
export type RatingCount = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
export type RatingValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
interface Props {
  type?: RatingTypes
  className?: string
  icon?: JSX.Element
  count?: RatingCount
  value?: RatingValue
  initialValue?: RatingValue
  onValueChange?: (value: number) => void
  locked?: boolean
  onLockedChange?: (locked: boolean) => void
}

const defaultProps = {
  type: 'default' as RatingTypes,
  className: '',
  icon: (<Star />) as JSX.Element,
  count: 5 as RatingCount,
  initialValue: 1 as RatingValue,
  locked: false,
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type RatingProps = Props & NativeAttrs

const getColor = (type: RatingTypes, palette: GeistUIThemesPalette): string => {
  const colors: { [key in RatingTypes]?: string } = {
    default: palette.foreground,
    success: palette.success,
    warning: palette.warning,
    error: palette.error,
  }
  return colors[type] || (colors.default as string)
}

const RatingComponent: React.FC<RatingProps> = ({
  type,
  children,
  className,
  icon,
  count,
  value: customValue,
  initialValue,
  onValueChange,
  locked,
  onLockedChange,
  ...props
}: React.PropsWithChildren<RatingProps> & typeof defaultProps) => {
  const theme = useTheme()
  const { SCALES } = useScaleable()
  const color = useMemo(() => getColor(type, theme.palette), [type, theme.palette])
  const [value, setValue] = useState<number>(initialValue)
  const [isLocked, setIsLocked] = useState<boolean>(locked)

  const lockedChangeHandler = (next: boolean) => {
    setIsLocked(next)
    onLockedChange && onLockedChange(next)
  }
  const valueChangeHandler = (next: number) => {
    setValue(next)
    const emitValue = next > count ? count : next
    onValueChange && onValueChange(emitValue)
  }
  const clickHandler = (index: number) => {
    if (isLocked) return lockedChangeHandler(false)
    valueChangeHandler(index)
    lockedChangeHandler(true)
  }
  const mouseEnterHandler = (index: number) => {
    if (isLocked) return
    valueChangeHandler(index)
  }

  useEffect(() => {
    if (typeof customValue === 'undefined') return
    setValue(customValue < 0 ? 0 : customValue)
  }, [customValue])

  return (
    <div className={`rating ${className}`} {...props}>
      {[...Array(count)].map((_, index) => (
        <div
          className={`icon-box ${index + 1 <= value ? 'hovered' : ''}`}
          key={index}
          onMouseEnter={() => mouseEnterHandler(index + 1)}
          onClick={() => clickHandler(index + 1)}>
          {icon}
        </div>
      ))}
      <style jsx>{`
        .rating {
          box-sizing: border-box;
          display: inline-flex;
          align-items: center;
          --rating-font-size: ${SCALES.font(1)};
          font-size: var(--rating-font-size);
          width: ${SCALES.width(1, 'auto')};
          height: ${SCALES.height(1, 'auto')};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
        }
        .icon-box {
          box-sizing: border-box;
          color: ${color};
          width: calc(var(--rating-font-size) * 1.5);
          height: calc(var(--rating-font-size) * 1.5);
          margin-right: calc(var(--rating-font-size) * 1 / 5);
          cursor: ${isLocked ? 'default' : 'pointer'};
        }
        .icon-box :global(svg) {
          width: 100%;
          height: 100%;
          fill: transparent;
          transform: scale(1);
        }
        .hovered :global(svg) {
          fill: ${color};
          transform: scale(0.9);
        }
      `}</style>
    </div>
  )
}

RatingComponent.defaultProps = defaultProps
RatingComponent.displayName = 'GeistRating'
const Rating = withScaleable(RatingComponent)
export default Rating
