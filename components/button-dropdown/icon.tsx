import React from 'react'

interface Props {
  color?: string
  height?: string
}

const ButtonDropdownIcon: React.FC<Props> = ({ color, height }) => {
  return (
    <svg
      stroke={color}
      style={{ color }}
      viewBox="0 0 24 24"
      width={height}
      height={height}
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      shapeRendering="geometricPrecision">
      <path d="M6 9l6 6 6-6" />

      <style jsx>{`
        svg {
          transform: scale(0.6);
        }
      `}</style>
    </svg>
  )
}

const MemoButtonDropdownIcon = React.memo(ButtonDropdownIcon)

export default MemoButtonDropdownIcon
