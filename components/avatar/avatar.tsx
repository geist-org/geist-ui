import React from 'react'
import { AVATAR_SIZES } from './constants'
import { NormalSizes } from '../utils/prop-types'
import withDefaults from '../utils/with-defaults'
import useTheme from '../styles/use-theme'

interface Props {
  src?: string
  stacked?: boolean
  text?: string
  size?: NormalSizes | number
  isSquare?: boolean
  className?: string
}

const defaultProps = {
  stacked: false,
  text: '',
  size: 'small' as NormalSizes,
  isSquare: false,
  className: '',
}

type NativeAttrs = React.ImgHTMLAttributes<any> | React.HTMLAttributes<any>
export type AvatarProps = Props & typeof defaultProps & NativeAttrs

const getAvatarSize = (size: NormalSizes | number): string => {
  if (typeof size === 'number') return `${size}px`
  if (!AVATAR_SIZES.has(size)) return AVATAR_SIZES.get(defaultProps.size) as string
  return AVATAR_SIZES.get(size) as string
}

const safeText = (text: string): string => {
  if (text.length <= 4) return text
  return text.slice(0, 3)
}

const Avatar: React.FC<AvatarProps> = React.memo(({
  src, stacked, text, size, isSquare, className, ...props
}) => {
  const theme = useTheme()
  const showText = !src
  const radius = isSquare ? theme.layout.radius : '50%'
  const marginLeft = stacked ? '-10px' : 0
  
  return (
    <span className={`avatar ${className}`}>
      {!showText && <img className="avatar-img" src={src} {...props} />}
      {showText && <span className="avatar-text" {...props}>{safeText(text)}</span>}

      <style jsx>{`
        .avatar {
          width: ${getAvatarSize(size)};
          height: ${getAvatarSize(size)};
          display: inline-block;
          position: relative;
          overflow: hidden;
          border: 1px solid ${theme.palette.accents_2};
          border-radius: ${radius};
          vertical-align: top;
          background-color: ${theme.palette.background};
          margin: 0 0 0 ${marginLeft};
        }
        
        .avatar:first-child {
          margin: 0;
        }
        
        .avatar-img {
          display: inline-block;
          width: 100%;
          height: 100%;
          border-radius: ${radius};
        }
        
        .avatar-text {
          position: absolute;
          left: 50%;
          top: 50%;
          font-size: 1em;
          text-align: center;
          transform: translate(-50%, -50%) scale(.65);
          white-space: nowrap;
          user-select: none;
        }
      `}</style>
    </span>
  )
})


export default withDefaults(Avatar, defaultProps)
