import React from 'react'
import useTheme from '../styles/use-theme'
import withDefaults from '../utils/with-defaults'

interface Props {
  color?: string
  width?: number
  height?: number
}

const defaultProps = {
  width: 16,
  height: 16,
}

export type PauseIconProps = Props & typeof defaultProps

const PauseIcon: React.FC<PauseIconProps> = ({ color, width, height }) => {
  const theme = useTheme()
  return (
    <svg
      viewBox="0 0 24 24"
      width={width}
      height={height}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="currentColor"
      shapeRendering="geometricPrecision">
      <rect x="6" y="4" width="4" height="16"></rect>
      <rect x="14" y="4" width="4" height="16"></rect>
      <style jsx>{`
        svg {
          color: ${color || theme.palette.accents_8};
        }
      `}</style>
    </svg>
  )
}

const MemoPauseIcon = React.memo(PauseIcon)

export default withDefaults(MemoPauseIcon, defaultProps)
