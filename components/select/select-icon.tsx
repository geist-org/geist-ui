import React  from 'react'
import withDefaults from '../utils/with-defaults'

interface Props {
  width?: string
}

const defaultProps = {
  width: '1.25em'
}

export type SelectIconProps = Props & typeof defaultProps

const SelectIcon: React.FC<SelectIconProps> = ({
  width,
}) => {
  return (
    <svg viewBox="0 0 24 24" width={width} height={width} strokeWidth="1" strokeLinecap="round"
      strokeLinejoin="round" fill="none" shapeRendering="geometricPrecision">
      <path d="M6 9l6 6 6-6" />
      <style jsx>{`
        svg {
          color: inherit;
          stroke: currentColor;
          transition: all 200ms ease;
        }
      `}</style>
    </svg>
  )
}

const MemoSelectIcon = React.memo(SelectIcon)

export default withDefaults(MemoSelectIcon, defaultProps)
