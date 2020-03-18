import React from 'react'
import withDefaults from '../utils/with-defaults'
import useTheme from '../styles/use-theme'
import LinkIcon from './icon'

interface Props {
  href?: string
  color?: boolean
  pure?: boolean
  underline: boolean
  className?: string
}

const defaultProps = {
  href: '',
  color: false,
  pure: false,
  underline: false,
  className: '',
}

export type LinkProps = Props & typeof defaultProps & React.AllHTMLAttributes<any>

const Link: React.FC<React.PropsWithChildren<LinkProps>> = React.memo(({
  href, color, underline, pure, children, className, ...props
}) => {
  const theme = useTheme()
  const linkColor = color ? theme.palette.success : 'inherit'
  const decoration = underline ? 'underline' : 'none'
  
  return (
    <a className={`link ${className}`} href={href} {...props}>
      {children}
      {!pure && <LinkIcon color={linkColor}/>}
      <style jsx>{`
        .link {
          display: inline-flex;
          line-height: inherit;
          color: ${linkColor};
          text-decoration: none;
          width: fit-content;
        }
        
        .link:hover, .link:active, .link:focus {
          text-decoration: ${decoration};
        }
      `}</style>
    </a>
  )
})

export default withDefaults(Link, defaultProps)
