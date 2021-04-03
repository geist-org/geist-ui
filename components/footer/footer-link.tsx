import React from 'react'
import useTheme from '../use-theme'

interface Props {
  target?: React.AnchorHTMLAttributes<HTMLAnchorElement>['target']
  href: string
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type FooterLinkProps = Props & NativeAttrs

const FooterLink: React.FC<React.PropsWithChildren<FooterLinkProps>> = ({
  href,
  children,
  target,
  ...props
}) => {
  const theme = useTheme()
  return (
    <li {...props}>
      <a href={href} target={target || '_self'}>
        {children}
      </a>
      <style jsx>{`
        li:before {
          content: '' !important;
        }
        li :global(a) {
          color: ${theme.palette.accents_5};
          transition: color 0.1s ease;
        }
        li :global(a):hover {
          color: ${theme.palette.foreground};
        }
        li {
          color: ${theme.palette.accents_5};
          padding: ${theme.layout.gapQuarter} 0;
        }
      `}</style>
    </li>
  )
}

const MemoFooterLink = React.memo(FooterLink)

export default MemoFooterLink
