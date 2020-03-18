import React from 'react'
import withDefaults from 'components/utils/with-defaults'
import useTheme from 'components/styles/use-theme'

interface Props {
  width: number
  height: number
}

const defaultProps = {
  width: 16,
  height: 16,
}

export type RefreshIconProps = Props & typeof defaultProps & React.SVGAttributes<any>

const RefreshIcon: React.FC<RefreshIconProps> = React.memo(({
  width, height, ...props
}) => {
  const theme = useTheme()
  return (
    <svg {...props} viewBox="0 0 24 24" width={width} height={height} stroke={theme.palette.accents_5}
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
      shapeRendering="geometricPrecision">
      <path d="M23 4v6h-6" />
      <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/>
      <style jsx>{`
        svg {
          color: ${theme.palette.accents_5};
          stroke: ${theme.palette.accents_5};
          padding: 5px 10px;
          transition: all .2s ease;
        }
        
        svg:hover {
          color: ${theme.palette.accents_3};
          stroke: ${theme.palette.accents_3};
        }
      `}</style>
    </svg>
  )
})

export default withDefaults(RefreshIcon, defaultProps)
