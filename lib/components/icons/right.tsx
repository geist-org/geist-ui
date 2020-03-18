import React from 'react'
import withDefaults from 'components/utils/with-defaults'
import useTheme from 'components/styles/use-theme'

interface Props {
  width: number
  height: number
  active?: boolean
}

const defaultProps = {
  width: 14,
  height: 14,
  active: false
}

export type RightIconProps = Props & typeof defaultProps

const RightIcon: React.FC<RightIconProps> = React.memo(({
  width, height, active, ...props
}) => {
  const theme = useTheme()
  return (
    <svg {...props} viewBox="0 0 24 24" width={width} height={height} stroke={theme.palette.accents_5} strokeWidth="1.5" strokeLinecap="round"
      strokeLinejoin="round" fill="none" shapeRendering="geometricPrecision" style={{ color: theme.palette.accents_5 }}>
      <path d="M9 18l6-6-6-6" />
      <style jsx>{`
        svg {
          transition: all .2s ease;
          transform: rotate(${active ? 90 : 0}deg);
        }
      `}</style>
    </svg>
  )
})

export default withDefaults(RightIcon, defaultProps)
