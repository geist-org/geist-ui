import React from 'react'
import useTheme from '../styles/use-theme'
import withDefaults from '../utils/with-defaults'

interface Props {
  color?: string
  width?: number
  height?: number
}

const defaultProps = {
  width: 22,
  height: 22,
}

export type TreeFileIconProps = Props & typeof defaultProps

const TreeFileIcon: React.FC<TreeFileIconProps> = ({
  color, width, height
}) => {
  const theme = useTheme()
  return (
    <svg viewBox="0 0 24 24" width={width} height={height} stroke="currentColor" strokeWidth="1" strokeLinecap="round"
      strokeLinejoin="round" fill="none" shapeRendering="geometricPrecision">
      <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" />
      <path d="M13 2v7h7" />
      <style jsx>{`
        svg {
          color: ${color || theme.palette.accents_8};
        }
      `}</style>
    </svg>
  )
}

const MemoTreeFileIcon = React.memo(TreeFileIcon)

export default withDefaults(MemoTreeFileIcon, defaultProps)
