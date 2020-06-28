import React, { ReactNode, useMemo } from 'react'
import useTheme from '../styles/use-theme'
import BreadcrumbsItem from './breadcrumbs-item'
import BreadcrumbsSeparator from './breadcrumbs-separator'
import { addColorAlpha } from '../utils/color'
import { NormalSizes } from '../utils/prop-types'

interface Props {
  size: NormalSizes
  separator?: string | ReactNode
  className?: string
}

const defaultProps = {
  size: 'medium' as NormalSizes,
  separator: '/',
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type BreadcrumbsProps = Props & typeof defaultProps & NativeAttrs

const getSize = (size: NormalSizes) => {
  const sizes: { [key in NormalSizes]: string } = {
    mini: '.75rem',
    small: '.875rem',
    medium: '1rem',
    large: '1.125rem',
  }
  return sizes[size]
}

const Breadcrumbs: React.FC<React.PropsWithChildren<BreadcrumbsProps>> = ({
  size,
  separator,
  children,
  className,
}) => {
  const theme = useTheme()
  const fontSize = useMemo(() => getSize(size), [size])
  const hoverColor = useMemo(() => {
    return addColorAlpha(theme.palette.link, 0.85)
  }, [theme.palette.link])

  const childrenArray = React.Children.toArray(children)
  const withSeparatorChildren = childrenArray.map((item, index) => {
    if (!React.isValidElement(item)) return item
    const last = childrenArray[index - 1]
    const lastIsSeparator = React.isValidElement(last) && last.type === BreadcrumbsSeparator
    const currentIsSeparator = item.type === BreadcrumbsSeparator
    if (!lastIsSeparator && !currentIsSeparator && index > 0) {
      return (
        <React.Fragment key={index}>
          <BreadcrumbsSeparator>{separator}</BreadcrumbsSeparator>
          {item}
        </React.Fragment>
      )
    }
    return item
  })

  return (
    <nav className={className}>
      {withSeparatorChildren}
      <style jsx>{`
        nav {
          margin: 0;
          padding: 0;
          line-height: inherit;
          color: ${theme.palette.accents_4};
          font-size: ${fontSize};
          box-sizing: border-box;
          display: flex;
          align-items: center;
        }

        nav :global(.link:hover) {
          color: ${hoverColor};
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
