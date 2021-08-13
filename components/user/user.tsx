import React, { ReactNode } from 'react'
import Avatar from '../avatar'
import useTheme from '../use-theme'
import useScaleable, { withScaleable } from '../use-scaleable'

interface Props {
  name: ReactNode | string
  src?: string
  text?: string
  className?: string
  altText?: string
}

const defaultProps = {
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type UserProps = Props & NativeAttrs

const UserComponent: React.FC<React.PropsWithChildren<UserProps>> = ({
  src,
  text,
  name,
  children,
  className,
  altText,
  ...props
}: React.PropsWithChildren<UserProps> & typeof defaultProps) => {
  const theme = useTheme()
  const { SCALES, getScaleableProps } = useScaleable()
  const scale = getScaleableProps('scale') as number | undefined
  return (
    <div className={`user ${className}`} {...props}>
      <Avatar src={src} scale={scale} text={text} alt={altText} />
      <div className="names">
        <span className="name">{name}</span>
        <span className="social">{children}</span>
      </div>

      <style jsx>{`
        .user {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          max-width: 100%;
          --user-font-size: ${SCALES.font(1)};
          font-size: var(--user-font-size);
          width: ${SCALES.width(1, 'max-content')};
          height: ${SCALES.height(1, 'auto')};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0.5)} ${SCALES.pb(0)} ${SCALES.pl(0.5)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
        }

        .names {
          font-size: inherit;
          margin-left: ${theme.layout.gapHalf};
          display: inline-flex;
          flex-direction: column;
          white-space: nowrap;
        }

        .name {
          font-size: calc(0.89 * var(--user-font-size));
          color: ${theme.palette.accents_8};
          line-height: 1.1em;
          text-transform: capitalize;
          font-weight: 500;
          max-width: 15rem;
          text-overflow: ellipsis;
          overflow: hidden;
        }

        .social {
          font-size: calc(0.75 * var(--user-font-size));
          color: ${theme.palette.accents_6};
        }

        .social :global(*:first-child) {
          margin-top: 0;
        }

        .social :global(*:last-child) {
          margin-bottom: 0;
        }
      `}</style>
    </div>
  )
}

UserComponent.defaultProps = defaultProps
UserComponent.displayName = 'GeistUser'
const User = withScaleable(UserComponent)
export default User
