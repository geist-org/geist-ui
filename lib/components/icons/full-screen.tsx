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

export type FullScreenIconProps = Props & typeof defaultProps & React.SVGAttributes<any>

const FullScreenIcon: React.FC<React.PropsWithChildren<FullScreenIconProps>> = ({
  width, height, ...props
}) => {
  return (
    <svg viewBox="0 0 24 24" width={width} height={height} {...props} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
      strokeLinejoin="round" fill="none" shapeRendering="geometricPrecision" style={{ color: 'currentColor' }}>
      <path d="M15 3h6m0 0v6m0-6l-7 7M9 21H3m0 0v-6m0 6l7-7M3 9V3m0 0h6M3 3l7 7m11 5v6m0 0h-6m6 0l-7-7"/>
    </svg>
  )
}

export default withDefaults(FullScreenIcon, defaultProps)
