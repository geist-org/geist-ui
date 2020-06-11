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

export type FullScreenCloseIconProps = Props & typeof defaultProps

const FullScreenCloseIcon: React.FC<FullScreenCloseIconProps> = ({ color, width, height }) => {
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
      <path d="M4 14h6m0 0v6m0-6l-7 7m17-11h-6m0 0V4m0 6l7-7m-7 17v-6m0 0h6m-6 0l7 7M10 4v6m0 0H4m6 0L3 3" />
      <style jsx>{`
        svg {
          color: ${color || theme.palette.accents_8};
        }
      `}</style>
    </svg>
  )
}

const MemoFullScreenCloseIcon = React.memo(FullScreenCloseIcon)

export default withDefaults(MemoFullScreenCloseIcon, defaultProps)
