import React, { useMemo } from 'react'
import useTheme from '../use-theme'
import { useProportions } from '../utils/calculations'
import { GeistUIThemesPalette } from '../themes/presets'
import useScaleable, { withScaleable } from '../use-scaleable'

interface Props {
  value?: number
  limit?: number
  color?: string
  className?: string
}

const defaultProps = {
  value: 0,
  limit: 100,
  color: '',
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type CapacityProps = Props & NativeAttrs

const getColor = (val: number, palette: GeistUIThemesPalette): string => {
  if (val < 33) return palette.cyan
  if (val < 66) return palette.warning
  return palette.errorDark
}

const CapacityComponent: React.FC<CapacityProps> = ({
  value,
  limit,
  color: userColor,
  className,
  ...props
}: CapacityProps & typeof defaultProps) => {
  const theme = useTheme()
  const { SCALES } = useScaleable()
  const percentValue = useProportions(value, limit)
  const color = useMemo(() => {
    if (userColor && userColor !== '') return userColor
    return getColor(percentValue, theme.palette)
  }, [userColor, percentValue, theme.palette])

  return (
    <div className={`capacity ${className}`} title={`${percentValue}%`} {...props}>
      <span />
      <style jsx>{`
        .capacity {
          width: ${SCALES.width(3.125)};
          height: ${SCALES.height(0.625)};
          border-radius: ${theme.layout.radius};
          overflow: hidden;
          background-color: ${theme.palette.accents_2};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
        }

        span {
          width: ${percentValue}%;
          background-color: ${color};
          height: 100%;
          margin: 0;
          padding: 0;
          display: block;
        }
      `}</style>
    </div>
  )
}

CapacityComponent.defaultProps = defaultProps
CapacityComponent.displayName = 'GeistCapacity'
const Capacity = withScaleable(CapacityComponent)
export default Capacity
