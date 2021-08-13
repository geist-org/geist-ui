import React from 'react'
import useTheme from '../use-theme'
import useWarning from '../utils/use-warning'
import LinkIcon from './icon'
import { addColorAlpha } from '../utils/color'
import useScaleable, { withScaleable } from '../use-scaleable'

export interface Props {
  href?: string
  color?: boolean
  pure?: boolean
  icon?: boolean
  underline?: boolean
  block?: boolean
  className?: string
}

const defaultProps = {
  href: '',
  color: false,
  pure: false,
  icon: false,
  underline: false,
  block: false,
  className: '',
}

type NativeAttrs = Omit<React.AnchorHTMLAttributes<any>, keyof Props>
export type LinkProps = Props & NativeAttrs

const LinkComponent = React.forwardRef<
  HTMLAnchorElement,
  React.PropsWithChildren<LinkProps>
>(
  (
    {
      href,
      color,
      underline,
      pure,
      children,
      className,
      block,
      icon,
      ...props
    }: React.PropsWithChildren<LinkProps> & typeof defaultProps,
    ref: React.Ref<HTMLAnchorElement>,
  ) => {
    const theme = useTheme()
    const { SCALES } = useScaleable()
    const linkColor = color || block ? theme.palette.link : 'inherit'
    const hoverColor = color || block ? theme.palette.successLight : 'inherit'
    const decoration = underline ? 'underline' : 'none'
    if (pure) {
      useWarning('Props "pure" is deprecated, now the default Link is pure.')
    }

    return (
      <a
        className={`link ${block ? 'block' : ''} ${className}`}
        href={href}
        {...props}
        ref={ref}>
        {children}
        {icon && <LinkIcon />}
        <style jsx>{`
          .link {
            display: inline-flex;
            align-items: baseline;
            line-height: inherit;
            color: ${linkColor};
            text-decoration: none;
            border-radius: ${block ? theme.layout.radius : 0};
            transition: color 200ms ease 0ms;
            font-size: ${SCALES.font(1, 'inherit')};
            width: ${SCALES.width(1, 'fit-content')};
            height: ${SCALES.height(1, 'auto')};
            margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
            padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
          }
          .block {
            padding: ${SCALES.pt(0.268)} ${SCALES.pr(0.5625)} ${SCALES.pb(0.268)}
              ${SCALES.pl(0.5625)};
          }

          .link:hover,
          .link:active,
          .link:focus {
            text-decoration: ${decoration};
          }

          .link:hover {
            background-color: ${block ? addColorAlpha(theme.palette.link, 0.1) : 'unset'};
            color: ${hoverColor};
          }
        `}</style>
      </a>
    )
  },
)

LinkComponent.defaultProps = defaultProps
LinkComponent.displayName = 'GeistLink'
const Link = withScaleable(LinkComponent)
export default Link
