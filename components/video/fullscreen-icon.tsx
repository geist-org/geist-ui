import React from 'react'
import useTheme from '../styles/use-theme'
import withDefaults from '../utils/with-defaults'

interface Props {
  color?: string
  width?: number
  height?: number
}

const defaultProps = {
  width: 14,
  height: 14,
}

export type FullScreenIconProps = Props & typeof defaultProps

const FullScreenIcon: React.FC<FullScreenIconProps> = ({ color, width, height }) => {
  const theme = useTheme()
  return (
    <svg
      viewBox="0 0 24 24"
      width={width}
      height={height}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      shapeRendering="geometricPrecision">
      <path d="M15 3h6m0 0v6m0-6l-7 7M9 21H3m0 0v-6m0 6l7-7M3 9V3m0 0h6M3 3l7 7m11 5v6m0 0h-6m6 0l-7-7" />
      <style jsx>{`
        svg {
          color: ${color || theme.palette.accents_8};
        }
      `}</style>
    </svg>
  )
}

const MemoFullScreenIcon = React.memo(FullScreenIcon)

export default withDefaults(MemoFullScreenIcon, defaultProps)
