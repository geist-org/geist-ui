import React from 'react'

const SelectIconComponent: React.FC<unknown> = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      shapeRendering="geometricPrecision">
      <path d="M6 9l6 6 6-6" />
      <style jsx>{`
        svg {
          color: inherit;
          stroke: currentColor;
          transition: all 200ms ease;
          width: 1.214em;
          height: 1.214em;
        }
      `}</style>
    </svg>
  )
}

SelectIconComponent.displayName = 'GeistSelectIcon'
const SelectIcon = React.memo(SelectIconComponent)
export default SelectIcon
