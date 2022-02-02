import React from 'react'
import Link from '../link'

interface Props {
  href?: string
  className?: string
}

const defaultProps = {
  className: '',
}

type NativeAttrs = Omit<React.AnchorHTMLAttributes<any>, keyof Props>
export type UserLinkProps = Props & NativeAttrs

const UserLink = React.forwardRef<
  HTMLAnchorElement,
  React.PropsWithChildren<UserLinkProps>
>(
  (
    {
      href,
      className,
      children,
      ...props
    }: React.PropsWithChildren<UserLinkProps> & typeof defaultProps,
    ref: React.Ref<HTMLAnchorElement>,
  ) => {
    return (
      <div className={className} {...props}>
        <Link ref={ref} href={href} color target="_blank" rel="noopener">
          {children}
        </Link>
        <style jsx>{`
          div :global(a:hover) {
            opacity: 0.7;
          }
        `}</style>
      </div>
    )
  },
)

UserLink.defaultProps = defaultProps
UserLink.displayName = 'GeistUserLink'
export default UserLink
