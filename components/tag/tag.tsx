import React, { useMemo } from 'react'
import withDefaults from '../utils/with-defaults'
import useTheme from '../styles/use-theme'
import { NormalTypes } from '../utils/prop-types'
import { ZeitUIThemes } from '../styles/themes'

interface Props {
  type?: NormalTypes
  className?: string
}

const defaultProps = {
  type: 'default' as NormalTypes,
  className: '',
}

export type TagProps = Props & typeof defaultProps & React.HTMLAttributes<any>

const getColor = (type: NormalTypes, theme: ZeitUIThemes): string => {
  const colors: { [key in NormalTypes]?: string } = {
    default: theme.palette.foreground,
    success: theme.palette.success,
    warning: theme.palette.warning,
    error: theme.palette.error,
  }
  return colors[type] || colors.default as string
}

const Tag: React.FC<React.PropsWithChildren<TagProps>> = React.memo(({
  type, children, className, ...props
}) => {
  const theme = useTheme()
  const color = useMemo(() => getColor(type, theme), [type, theme])
  
  return (
    <span className={className} {...props}>
      {children}
      <style jsx>{`
        span {
          color: ${color};
          display: inline-block;
          line-height: .875rem;
          font-size: .875rem;
          height: 1.75rem;
          border-radius: ${theme.layout.radius};
          border: 1px solid ${theme.palette.accents_2};
          background-color: ${theme.palette.accents_1};
          padding: 6px;
        }
      `}</style>
    </span>
  )
})

export default withDefaults(Tag, defaultProps)
