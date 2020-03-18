import React from 'react'
import withDefaults from 'components/utils/with-defaults'
import useTheme from 'components/styles/use-theme'

interface Props {
  width: number
  height: number
}

const defaultProps = {
  width: 20,
  height: 20,
}

export type CopyIconProps = Props & typeof defaultProps & React.SVGAttributes<any>

const CopyIcon: React.FC<CopyIconProps> = React.memo(({
  width, height, ...props
}) => {
  const theme = useTheme()
  return (
    <svg {...props} viewBox="0 0 24 24" width={width} height={height} strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" fill="none" shapeRendering="geometricPrecision">
      <path d="M8 17.929H6c-1.105 0-2-.912-2-2.036V5.036C4 3.91 4.895 3 6 3h8c1.105 0 2 .911 2 2.036v1.866m-6 .17h8c1.105 0 2 .91 2 2.035v10.857C20 21.09 19.105 22 18 22h-8c-1.105 0-2-.911-2-2.036V9.107c0-1.124.895-2.036 2-2.036z"/>
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

export default withDefaults(CopyIcon, defaultProps)
