import React, { useMemo } from 'react'
import useTheme from '../use-theme'
import { NormalTypes } from '../utils/prop-types'
import { GeistUIThemes } from '../themes/presets'
import useScaleable, { withScaleable } from '../use-scaleable'

export type NoteTypes = NormalTypes
interface Props {
  type?: NoteTypes
  label?: string | boolean
  filled?: boolean
  className?: string
}

const defaultProps = {
  type: 'default' as NoteTypes,
  label: 'note' as string | boolean,
  filled: false,
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type NoteProps = Props & NativeAttrs

const getStatusColor = (type: NoteTypes, filled: boolean, theme: GeistUIThemes) => {
  const colors: { [key in NoteTypes]?: string } = {
    secondary: theme.palette.secondary,
    success: theme.palette.success,
    warning: theme.palette.warning,
    error: theme.palette.error,
  }
  const statusColor = colors[type]

  if (!filled)
    return {
      color: statusColor || theme.palette.foreground,
      borderColor: statusColor || theme.palette.border,
      bgColor: theme.palette.background,
    }
  const filledColor = statusColor ? 'white' : theme.palette.background
  return {
    color: filledColor,
    borderColor: statusColor || theme.palette.foreground,
    bgColor: statusColor || theme.palette.foreground,
  }
}

export const NoteComponent: React.FC<React.PropsWithChildren<NoteProps>> = ({
  children,
  type,
  label,
  filled,
  className,
  ...props
}: React.PropsWithChildren<NoteProps> & typeof defaultProps) => {
  const theme = useTheme()
  const { SCALES } = useScaleable()
  const { color, borderColor, bgColor } = useMemo(
    () => getStatusColor(type, filled, theme),
    [type, filled, theme],
  )

  return (
    <div className={`note ${className}`} {...props}>
      {label && (
        <span className="label">
          <b>{label}:</b>
        </span>
      )}
      {children}

      <style jsx>{`
        .note {
          line-height: 1.8;
          border: 1px solid ${borderColor};
          color: ${color};
          background-color: ${bgColor};
          border-radius: ${theme.layout.radius};
          font-size: ${SCALES.font(0.875)};
          width: ${SCALES.width(1, 'auto')};
          height: ${SCALES.height(1, 'auto')};
          padding: ${SCALES.pt(0.667)} ${SCALES.pr(1.32)} ${SCALES.pb(0.667)}
            ${SCALES.pl(1.32)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
        }

        .note :global(p) {
          margin: 0;
        }

        .label {
          text-transform: uppercase;
          user-select: none;
          line-height: 1.5;
          padding-right: 0.38em;
        }
      `}</style>
    </div>
  )
}

NoteComponent.defaultProps = defaultProps
NoteComponent.displayName = 'GeistNote'
const Note = withScaleable(NoteComponent)
export default Note
