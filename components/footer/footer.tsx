import React from 'react'
import useTheme from '../use-theme'
import FooterGroup from './footer-group'
import FooterLink from './footer-link'
import FooterColumn from './footer-column'
import { FooterContext } from './footer-context'

interface Props {
  reverse?: boolean
  subFooter?: string | React.ReactNode
  ariaLabel?: string
  maxWidth?: string
  breakPoint?: string
}

const defaultProps = {
  reverse: false,
  ariaLabel: 'Footer Links',
  breakPoint: '960px',
  maxWidth: '1000px',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type FooterProps = Props & typeof defaultProps & NativeAttrs

const Footer: React.FC<React.PropsWithChildren<FooterProps>> = ({
  reverse,
  ariaLabel,
  children,
  subFooter,
  maxWidth,
  breakPoint,
  ...props
}) => {
  const theme = useTheme()
  const bgColor = reverse ? `${theme.palette.background}` : `${theme.palette.accents_1}`
  return (
    <FooterContext.Provider value={{ maxWidth, breakPoint }}>
      <footer {...props}>
        <nav role="navigation" aria-label={ariaLabel}>
          {children}
        </nav>
        {subFooter && <section>{subFooter}</section>}
        <style jsx>{`
          footer {
            font-size: 0.875rem;
            background: ${bgColor};
            border-top: 1px solid ${theme.palette.accents_2};
            padding: calc(1.5 * ${theme.layout.gap}) ${theme.layout.gap}
              ${theme.layout.gap};
            flex: 1;
            justify-content: flex-start;
            align-items: strech;
          }
          footer nav {
            max-width: ${maxWidth};
            margin: 0 auto;
            display: flex;
            flex-wrap: nowrap;
            justify-content: space-between;
          }
          @media screen and (max-width: ${breakPoint}) {
            footer nav {
              flex-direction: column;
            }
          }
          section {
            max-width: ${maxWidth};
            margin: 0 auto;
            margin-top: ${theme.layout.gap};
          }
        `}</style>
      </footer>
    </FooterContext.Provider>
  )
}

type MemoFooterComponent<P = {}> = React.NamedExoticComponent<P> & {
  Group: typeof FooterGroup
  Link: typeof FooterLink
  Column: typeof FooterColumn
}
type ComponentProps = Partial<typeof defaultProps> &
  Omit<Props, keyof typeof defaultProps> &
  NativeAttrs

Footer.defaultProps = defaultProps

export default React.memo(Footer) as MemoFooterComponent<ComponentProps>
