import React, { useMemo } from 'react'
import withDefaults from '../utils/with-defaults'
import useTheme from '../styles/use-theme'
import { useProportions } from '../utils/calculations'
import { GeistUIThemesPalette } from '../styles/themes'

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
export type CapacityProps = Props & typeof defaultProps & NativeAttrs

const getColor = (val: number, palette: GeistUIThemesPalette): string => {
  if (val < 33) return palette.cyan
  if (val < 66) return palette.warning
  return palette.errorDark
}

const Capacity: React.FC<CapacityProps> = ({
  value,
  limit,
  color: userColor,
  className,
  ...props
}) => {
  const theme = useTheme()
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
          width: 50px;
          height: 10px;
          border-radius: ${theme.layout.radius};
          overflow: hidden;
          background-color: ${theme.palette.accents_2};
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

const MemoCapacity = React.memo(Capacity)

export default withDefaults(MemoCapacity, defaultProps)
