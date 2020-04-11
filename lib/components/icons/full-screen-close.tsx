import React from 'react'
import withDefaults from 'components/utils/with-defaults'

interface Props {
  width: number
  height: number
}

const defaultProps = {
  width: 20,
  height: 20,
}

export type FullScreenCloseIconProps = Props & typeof defaultProps & React.SVGAttributes<any>

const FullScreenCloseIcon: React.FC<React.PropsWithChildren<FullScreenCloseIconProps>> = ({
  width, height, ...props
}) => {
  return (
    <svg viewBox="0 0 24 24" width={width} height={height} {...props} stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" fill="none" shapeRendering="geometricPrecision"
      style={{ color: 'currentColor' }}>
      <path d="M4 14h6m0 0v6m0-6l-7 7m17-11h-6m0 0V4m0 6l7-7m-7 17v-6m0 0h6m-6 0l7 7M10 4v6m0 0H4m6 0L3 3"/>
    </svg>
  )
}

export default withDefaults(FullScreenCloseIcon, defaultProps)
