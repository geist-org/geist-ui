import React from 'react'
import withDefaults from 'components/utils/with-defaults'
import useTheme from 'components/styles/use-theme'

interface Props {
  width?: number
  height?: number
  color?: string
}

const defaultProps = {
  width: 15,
  height: 15,
}

export type ToggleIconProps = Props & typeof defaultProps & React.SVGAttributes<any>

const ToggleIcon: React.FC<ToggleIconProps> = React.memo(({
  width, height, color, ...props
}) => {
  const theme = useTheme()
  return (
    <svg width={width} height={height} {...props} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" fill="none" shapeRendering="geometricPrecision"
      className="bar-toggle">
      <path d="M4 21v-7" />
      <path d="M4 10V3" />
      <path d="M12 21v-9" />
      <path d="M12 8V3" />
      <path d="M20 21v-5" />
      <path d="M20 12V3" />
      <path d="M1 14h6" />
      <path d="M9 8h6" />
      <path d="M17 16h6" />
  
      <style jsx>{`
        svg {
          color: ${color || theme.palette.foreground};
        }
      `}</style>
    </svg>
  )
})

export default withDefaults(ToggleIcon, defaultProps)
