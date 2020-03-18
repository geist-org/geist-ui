import React, { useMemo } from 'react'
import withDefaults from '../utils/with-defaults'
import useTheme from '../styles/use-theme'
import { NormalTypes } from '../utils/prop-types'
import { ZeitUIThemesPalette } from '../styles/themes'

export const ComponentTypes: Array<keyof JSX.IntrinsicElements> = [
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'small',
]

export const ComponentModifiedElements: { [key: string]: string } = {
  bold: 'b',
  b: 'b',
  italic: 'i',
  i: 'i',
  desc: 'desc',
  description: 'desc',
  del: 'del',
}

export interface Props {
  tag: keyof JSX.IntrinsicElements
  type?: NormalTypes
  className?: ''
}

const defaultProps = {
  type: 'default' as NormalTypes,
  className: '',
}

const getTypeColor = (type: NormalTypes, palette: ZeitUIThemesPalette) => {
  const colors: { [key in NormalTypes]: string} = {
    default: palette.foreground,
    secondary: palette.secondary,
    success: palette.success,
    warning: palette.warning,
    error: palette.error,
  }
  
  return colors[type] || colors.default
}

export type TextChildProps = Props & typeof defaultProps & React.DetailsHTMLAttributes<any>

const TextChild: React.FC<React.PropsWithChildren<TextChildProps>> = React.memo(({
  children, tag, className, type, ...props
}) => {
  const theme = useTheme()
  const Component = tag
  const color = useMemo(
    () => getTypeColor(type, theme.palette),
    [type, theme.palette],
  )
  return (
    <>
      <Component className={className} {...props}>{children}</Component>
      <style jsx>{`
        ${tag} {
          color: ${color};
        }
      `}</style>
    </>
  )
})

export default withDefaults(TextChild, defaultProps)

