import React, { useMemo } from 'react'
import useTheme from '../use-theme'
import { NormalTypes } from '../utils/prop-types'
import { GeistUIThemes } from '../themes/presets'
import useScaleable, { withScaleable } from '../use-scaleable'

export type DotTypes = NormalTypes
interface Props {
  type?: DotTypes
  className?: string
}

const defaultProps = {
  type: 'default' as DotTypes,
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type DotProps = Props & NativeAttrs

const getColor = (type: DotTypes, theme: GeistUIThemes): string => {
  const colors: { [key in DotTypes]?: string } = {
    default: theme.palette.accents_2,
    success: theme.palette.success,
    warning: theme.palette.warning,
    error: theme.palette.error,
  }
  return colors[type] || (colors.default as string)
}

const DotComponent: React.FC<React.PropsWithChildren<DotProps>> = ({
  type,
  children,
  className,
  ...props
}: React.PropsWithChildren<DotProps> & typeof defaultProps) => {
  const theme = useTheme()
  const { SCALES } = useScaleable()
  const color = useMemo(() => getColor(type, theme), [type, theme])
  return (
    <span className={`dot ${className}`} {...props}>
      <span className="icon" />
      <span className="label">{children}</span>

      <style jsx>{`
        .dot {
          display: inline-flex;
          align-items: center;
          font-size: ${SCALES.font(1)};
          width: ${SCALES.width(1, 'auto')};
          height: ${SCALES.height(1, 'auto')};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
        }

        .icon {
          width: 0.625em;
          height: 0.625em;
          min-width: calc(0.625 * 12px);
          min-height: calc(0.625 * 12px);
          line-height: 0.625em;
          border-radius: 50%;
          background-color: ${color};
          user-select: none;
        }

        .label {
          margin-left: 0.5em;
          font-size: 1em;
          line-height: 1em;
          text-transform: capitalize;
        }
      `}</style>
    </span>
  )
}

DotComponent.defaultProps = defaultProps
DotComponent.displayName = 'GeistDot'
const Dot = withScaleable(DotComponent)
export default Dot
