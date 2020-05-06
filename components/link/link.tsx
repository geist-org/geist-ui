import React from 'react'
import withDefaults from '../utils/with-defaults'
import useTheme from '../styles/use-theme'
import LinkIcon from './icon'

interface Props {
  href?: string
  color?: boolean
  pure?: boolean
  underline?: boolean
  block?: boolean
  className?: string
}

const defaultProps = {
  href: '',
  color: false,
  pure: false,
  underline: false,
  block: false,
  className: '',
}

type NativeAttrs = Omit<React.AnchorHTMLAttributes<any>, keyof Props>
export type LinkProps = Props & typeof defaultProps & NativeAttrs

const Link = React.forwardRef<HTMLAnchorElement, React.PropsWithChildren<LinkProps>>(
  (
    { href, color, underline, pure, children, className, block, ...props },
    ref: React.Ref<HTMLAnchorElement>,
  ) => {
    const theme = useTheme()
    const linkColor = color || block ? theme.palette.link : 'inherit'
    const padding = block ? theme.layout.gapQuarter : '0'
    const decoration = underline ? 'underline' : 'none'

    return (
      <a className={`link ${className}`} href={href} {...props} ref={ref}>
        {children}
        {!pure && <LinkIcon color={linkColor} />}
        <style jsx>{`
          .link {
            display: inline-flex;
            align-items: baseline;
            line-height: inherit;
            color: ${linkColor};
            text-decoration: none;
            padding: calc(${padding} * 0.8) calc(${padding} * 1.7);
            border-radius: ${block ? theme.layout.radius : 0};
            width: fit-content;
          }

          .link:hover,
          .link:active,
          .link:focus {
            text-decoration: ${decoration};
          }

          .link:hover {
            background-color: ${block ? '#0076ff1a' : 'unset'};
          }
        `}</style>
      </a>
    )
  },
)

const MemoLink = React.memo(Link)

export default withDefaults(MemoLink, defaultProps)
