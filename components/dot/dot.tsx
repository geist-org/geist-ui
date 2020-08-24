import React, { useMemo } from 'react'
import withDefaults from '../utils/with-defaults'
import useTheme from '../styles/use-theme'
import { NormalTypes } from '../utils/prop-types'
import { GeistUIThemes } from '../styles/themes'

interface Props {
  type?: NormalTypes
  className?: string
}

const defaultProps = {
  type: 'default' as NormalTypes,
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type DotProps = Props & typeof defaultProps & NativeAttrs

const getColor = (type: NormalTypes, theme: GeistUIThemes): string => {
  const colors: { [key in NormalTypes]?: string } = {
    default: theme.palette.accents_2,
    success: theme.palette.success,
    warning: theme.palette.warning,
    error: theme.palette.error,
  }
  return colors[type] || (colors.default as string)
}

const Dot: React.FC<React.PropsWithChildren<DotProps>> = ({
  type,
  children,
  className,
  ...props
}) => {
  const theme = useTheme()
  const color = useMemo(() => getColor(type, theme), [type, theme])
  return (
    <span className={`dot ${className}`} {...props}>
      <span className="icon" />
      <span className="label">{children}</span>

      <style jsx>{`
        .dot {
          display: inline-flex;
          align-items: center;
        }

        .icon {
          width: 0.625rem;
          height: 0.625rem;
          border-radius: 50%;
          background-color: ${color};
          user-select: none;
        }

        .label {
          margin-left: 8px;
          font-size: 1rem;
          text-transform: capitalize;
        }
      `}</style>
    </span>
  )
}

const MemoDot = React.memo(Dot)

export default withDefaults(MemoDot, defaultProps)
