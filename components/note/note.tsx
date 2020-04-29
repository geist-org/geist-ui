import React, { useMemo } from 'react'
import useTheme from '../styles/use-theme'
import withDefaults from '../utils/with-defaults'
import { NormalTypes } from '../utils/prop-types'
import { ZeitUIThemes } from '../styles/themes'

interface Props {
  type?: NormalTypes
  label?: string | boolean
  small?: boolean
  filled?: boolean
  className?: string
}

const defaultProps = {
  type: 'default' as NormalTypes,
  label: 'note' as string | boolean,
  small: false,
  filled: false,
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type NoteProps = Props & typeof defaultProps & NativeAttrs

const getStatusColor = (type: NormalTypes, filled: boolean, theme: ZeitUIThemes) => {
  const colors: { [key in NormalTypes]?: string } = {
    secondary: theme.palette.secondary,
    success: theme.palette.success,
    warning: theme.palette.warning,
    error: theme.palette.error,
  }
  const statusColor = colors[type]
  
  if (!filled) return {
    color: statusColor || theme.palette.foreground,
    borderColor: statusColor || theme.palette.border,
    bgColor: theme.palette.background,
  }
  
  return {
    color: theme.palette.background,
    borderColor: statusColor || theme.palette.foreground,
    bgColor: statusColor || theme.palette.foreground,
  }
}

export const Note: React.FC<React.PropsWithChildren<NoteProps>> = ({
  children, type, label, filled, small, className, ...props
}) => {
  const theme = useTheme()
  const { color, borderColor, bgColor } = useMemo(
    () => getStatusColor(type, filled, theme),
    [type, filled, theme]
  )
  const padding = small
    ? `calc(${theme.layout.gapHalf} / 2) calc(${theme.layout.gap} / 2)`
    : `${theme.layout.gapHalf} ${theme.layout.gap}`
  
  return (
    <div className={`note ${className}`} {...props}>
      {label && <span className="label"><b>{label}:</b></span>}
      {children}
  
      <style jsx>{`
        .note {
          padding: ${padding};
          font-size: 14px;
          line-height: 1.8;
          border: 1px solid ${borderColor};
          color: ${color};
          background-color: ${bgColor};
          border-radius: ${theme.layout.radius};
        }
        
        .note :global(p) {
          margin: 0
        }
        
        .label {
          text-transform: uppercase;
          user-select: none;
          line-height: 1.5;
          padding-right: ${theme.layout.gapQuarter};
        }
        
      `}</style>
    </div>
  )

}

const MemoNote = React.memo(Note)

export default withDefaults(MemoNote, defaultProps)

