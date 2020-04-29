import React, { useMemo } from 'react'
import { NormalSizes } from '../utils/prop-types'
import useTheme from '../styles/use-theme'
import AvatarGroup from './avatar-group'

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
  size: 'small' as NormalSizes | number,
  isSquare: false,
  className: '',
}

type NativeAttrs = Omit<Partial<React.ImgHTMLAttributes<any> & React.HTMLAttributes<any>>, keyof Props>
export type AvatarProps = Props & typeof defaultProps & NativeAttrs

const getSize = (size: NormalSizes | number): string => {
  const sizes: { [key in NormalSizes]: string } = {
    mini: '1.25rem',
    small: '1.875rem',
    medium: '3.75rem',
    large: '5.625rem',
  }
  if (typeof size === 'number') return `${size}px`
  return sizes[size]
}

const safeText = (text: string): string => {
  if (text.length <= 4) return text
  return text.slice(0, 3)
}

const Avatar: React.FC<AvatarProps> = ({
  src, stacked, text, size, isSquare, className, ...props
}) => {
  const theme = useTheme()
  const showText = !src
  const radius = isSquare ? theme.layout.radius : '50%'
  const marginLeft = stacked ? '-.625rem' : 0
  const width = useMemo(() => getSize(size), [size])
  
  return (
    <span className={`avatar ${className}`}>
      {!showText && <img className="avatar-img" src={src} {...props} />}
      {showText && <span className="avatar-text" {...props}>{safeText(text)}</span>}

      <style jsx>{`
        .avatar {
          width: ${width};
          height: ${width};
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
}

type MemoAvatarComponent<P = {}> = React.NamedExoticComponent<P> & {
  Group: typeof AvatarGroup
}

type ComponentProps = Partial<typeof defaultProps> & Omit<Props, keyof typeof defaultProps> & NativeAttrs

Avatar.defaultProps = defaultProps

export default React.memo(Avatar) as MemoAvatarComponent<ComponentProps>
