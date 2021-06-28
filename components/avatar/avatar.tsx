import React from 'react'
import useTheme from '../use-theme'
import useScaleable, { withScaleable } from '../use-scaleable'

interface Props {
  src?: string
  stacked?: boolean
  text?: string
  isSquare?: boolean
  className?: string
}

const defaultProps = {
  stacked: false,
  text: '',
  isSquare: false,
  className: '',
}

type NativeAttrs = Omit<
  Partial<React.ImgHTMLAttributes<any> & React.HTMLAttributes<any>>,
  keyof Props
>
export type AvatarProps = Props & NativeAttrs

const safeText = (text: string): string => {
  if (text.length <= 4) return text
  return text.slice(0, 3)
}

const AvatarComponent: React.FC<AvatarProps> = ({
  src,
  stacked,
  text,
  isSquare,
  className,
  ...props
}: AvatarProps & typeof defaultProps) => {
  const theme = useTheme()
  const { SCALES } = useScaleable()
  const showText = !src
  const radius = isSquare ? theme.layout.radius : '50%'
  const marginLeft = stacked ? SCALES.ml(-0.625) : SCALES.ml(0)

  return (
    <span className={`avatar ${className}`}>
      {!showText && (
        <img alt="avatar" className="avatar-img" src={src} draggable={false} {...props} />
      )}
      {showText && (
        <span className="avatar-text" {...props}>
          {safeText(text)}
        </span>
      )}

      <style jsx>{`
        .avatar {
          display: inline-block;
          position: relative;
          overflow: hidden;
          border: 1px solid ${theme.palette.accents_2};
          border-radius: ${radius};
          vertical-align: top;
          background-color: ${theme.palette.background};
          box-sizing: border-box;
          width: ${SCALES.width(1.75) || SCALES.height(1.75)};
          height: ${SCALES.height(1.75) || SCALES.width(1.75)};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${marginLeft};
        }

        .avatar-img {
          display: inline-block;
          object-fit: cover;
          width: 100%;
          height: 100%;
          border-radius: ${radius};
          user-select: none;
        }

        .avatar-text {
          position: absolute;
          left: 50%;
          top: 50%;
          font-size: ${SCALES.font(1)};
          text-align: center;
          transform: translate(-50%, -50%) scale(0.65);
          white-space: nowrap;
          user-select: none;
        }
      `}</style>
    </span>
  )
}

AvatarComponent.defaultProps = defaultProps
AvatarComponent.displayName = 'GeistAvatar'
const Avatar = withScaleable(AvatarComponent)
export default Avatar
