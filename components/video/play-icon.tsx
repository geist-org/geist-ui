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

export type PlayIconProps = Props & typeof defaultProps

const PlayIcon: React.FC<PlayIconProps> = ({ color, width, height }) => {
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
      <polygon points="5 3 19 12 5 21 5 3" />
      <style jsx>{`
        svg {
          color: ${color || theme.palette.accents_8};
        }
      `}</style>
    </svg>
  )
}

const MemoPlayIcon = React.memo(PlayIcon)

export default withDefaults(MemoPlayIcon, defaultProps)
