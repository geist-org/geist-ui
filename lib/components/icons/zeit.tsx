import React from 'react'
import withDefaults from 'components/utils/with-defaults'
import useTheme from 'components/styles/use-theme'

interface Props {
  width: number
  height: number
}

const defaultProps = {
  width: 24,
  height: 24,
}

export type ZEITIconProps = Props & typeof defaultProps

const ZEITIcon: React.FC<ZEITIconProps> = React.memo(({
  width, height, ...props
}) => {
  const theme = useTheme()
  return (
    <svg viewBox="0 0 226 200" aria-label="zeit" {...props}>
      <defs>
        <linearGradient x1="196.572%" y1="228.815%" x2="50%" y2="50%" id="logo-119">
          <stop offset="0%" stopColor={theme.palette.background} />
          <stop offset="100%" stopColor={theme.palette.foreground} />
        </linearGradient>
      </defs>
      <path fill="url(#logo-119)" d="M254 156.46L367 356H141z" transform="translate(-141 -156)" />
      <style jsx>{`
        svg {
          width: ${width}px;
          height: ${height}px;
        }
      `}</style>
    </svg>
  )
})

export default withDefaults(ZEITIcon, defaultProps)
