import React from 'react'
import withDefaults from 'components/utils/with-defaults'
import useTheme from 'components/styles/use-theme'

interface Props {
  width: number
  height: number
}

const defaultProps = {
  width: 24,
  height: 24,
}

export type MoonIconProps = Props & typeof defaultProps

const MoonIcon: React.FC<MoonIconProps> = React.memo(({
  width, height, ...props
}) => {
  const theme = useTheme()
  return (
    <svg {...props} width={width} height={height}
      viewBox="0 0 24 24"  stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" fill="none" shapeRendering="geometricPrecision"
      style={{ color: theme.palette.accents_5 }}>
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  )
})

export default withDefaults(MoonIcon, defaultProps)
