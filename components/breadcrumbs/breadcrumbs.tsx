import React, { ReactNode, useMemo } from 'react'
import useTheme from '../styles/use-theme'
import BreadcrumbsItem from './breadcrumbs-item'
import BreadcrumbsSeparator from './breadcrumbs-separator'
import { addColorAlpha } from '../utils/color'
import { BreadcrumbsContext } from './breadcrumbs-context'

interface Props {
  separator?: string | ReactNode
  className?: string
}

const defaultProps = {
  separator: '/',
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type BreadcrumbsProps = Props & typeof defaultProps & NativeAttrs

const Breadcrumbs: React.FC<React.PropsWithChildren<BreadcrumbsProps>> = ({
  separator,
  children,
  className,
}) => {
  const theme = useTheme()
  const initialValue = useMemo(
    () => ({
      separator,
    }),
    [separator],
  )

  return (
    <BreadcrumbsContext.Provider value={initialValue}>
      <nav className={className}>
        {children}
        <style jsx>{`
          nav {
            margin: 0;
            padding: 0;
            line-height: inherit;
            color: ${theme.palette.accents_4};
            font-size: 1rem;
            box-sizing: border-box;
            display: flex;
            align-items: center;
          }

          nav :global(.link:hover) {
            color: ${addColorAlpha(theme.palette.link, 0.85)};
          }

          nav > :global(span:last-of-type) {
            color: ${theme.palette.accents_6};
          }

          nav > :global(.separator:last-child) {
            display: none;
          }

          nav :global(svg) {
            width: 1em;
            height: 1em;
            margin: 0 4px;
          }

          nav :global(.breadcrums-item) {
            display: inline-flex;
            align-items: center;
          }
        `}</style>
      </nav>
    </BreadcrumbsContext.Provider>
  )
}

type MemoBreadcrumbsComponent<P = {}> = React.NamedExoticComponent<P> & {
  Item: typeof BreadcrumbsItem
  Separator: typeof BreadcrumbsSeparator
}
type ComponentProps = Partial<typeof defaultProps> &
  Omit<Props, keyof typeof defaultProps> &
  NativeAttrs

Breadcrumbs.defaultProps = defaultProps

export default React.memo(Breadcrumbs) as MemoBreadcrumbsComponent<ComponentProps>
