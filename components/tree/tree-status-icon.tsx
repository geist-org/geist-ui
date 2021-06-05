import React from 'react'
import useTheme from '../use-theme'

export interface TreeStatusIconProps {
  color?: string
  width?: number
  height?: number
  active?: boolean
}

const defaultProps = {
  width: 12,
  height: 12,
  active: false,
}

const TreeStatusIcon: React.FC<TreeStatusIconProps> = ({
  color,
  width,
  height,
  active,
}: TreeStatusIconProps & typeof defaultProps) => {
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
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      {!active && <path d="M12 8v8" />}
      <path d="M8 12h8" />

      <style jsx>{`
        svg {
          color: ${color || theme.palette.accents_8};
        }
      `}</style>
    </svg>
  )
}

TreeStatusIcon.defaultProps = defaultProps
TreeStatusIcon.displayName = 'GeistTreeStatusIcon'
export default TreeStatusIcon
