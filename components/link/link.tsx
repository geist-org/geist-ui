import React from 'react'
import withDefaults from '../utils/with-defaults'
import useTheme from '../styles/use-theme'
import useWarning from '../utils/use-warning'
import LinkIcon from './icon'

export interface Props {
  href?: string
  color?: boolean
  plain?: boolean
  pure?: boolean
  icon?: boolean
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  underline?: boolean
  block?: boolean
  disabled?: boolean
  className?: string
}

const defaultProps = {
  href: '',
  color: false,
  plain: false,
  pure: false,
  icon: false,
  underline: false,
  block: false,
  disabled: false,
  className: '',
}

type NativeAttrs = Omit<React.AnchorHTMLAttributes<any>, keyof Props>
export type LinkProps = Props & typeof defaultProps & NativeAttrs

const Link = React.forwardRef<HTMLAnchorElement, React.PropsWithChildren<LinkProps>>(
  (
    {
      href,
      color,
      plain,
      pure,
      icon,
      iconLeft,
      iconRight,
      underline,
      block,
      disabled,
      className,
      children,
      ...props
    },
    ref: React.Ref<HTMLAnchorElement>,
  ) => {
    const theme = useTheme()
    const linkColor = plain ? 'inherit' : theme.palette.cTheme5
    const hoverColor = theme.palette.cTheme6
    const disabledColor = theme.palette.cNeutral5
    const padding = block ? '2px 4px' : '0'
    const decoration = underline ? 'underline' : 'none'
    if (pure) {
      useWarning('Props "pure" is deprecated, now the default Link is pure.', 'Link')
    }
    if (color) {
      useWarning('Props "color" is deprecated, now the default Link is colored.', 'Link', 'info')
    }
    if (icon) {
      useWarning(
        'Props "icon" is no longer supported, use "iconLeft" or "iconRight" instead.',
        'Link',
        'info',
      )
    }

    return (
      <a
        href={href}
        className={`link ${className}${disabled ? ' disabled' : ''}`}
        ref={ref}
        {...props}>
        {iconLeft && <LinkIcon icon={iconLeft} className="left" />}
        {children}
        {iconRight && <LinkIcon icon={iconRight} className="right" />}
        <style jsx>{`
          .link {
            display: inline-flex;
            align-items: baseline;
            padding: ${padding};
            width: fit-content;
            line-height: inherit;
            text-decoration: none;
            color: ${linkColor};
            border-radius: ${block ? theme.expressiveness.R2 : 0};
            transition: color 200ms ease 0ms;
          }

          .link:hover,
          .link:active,
          .link:focus {
            text-decoration: ${decoration};
          }

          .link:hover {
            color: ${hoverColor};
            background-color: ${block ? theme.palette.cTheme0 : 'unset'};
          }

          .link.disabled {
            color: ${disabledColor};
            pointer-events: none;
            cursor: default;
          }

          .link :global(.left) {
            margin-left: 0;
          }

          .link :global(.right) {
            margin-right: 0;
          }
        `}</style>
      </a>
    )
  },
)

const MemoLink = React.memo(Link)

export default withDefaults(MemoLink, defaultProps)
