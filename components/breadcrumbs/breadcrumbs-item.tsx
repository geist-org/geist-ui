import Link from '../link'
import { Props as LinkBasicProps } from '../link/link'
import React, { useMemo } from 'react'
import withDefaults from '../utils/with-defaults'
import { pickChild } from '../utils/collections'
import BreadcrumbsSeparator from './breadcrumbs-separator'
import { useBreadcrumbsContext } from './breadcrumbs-context'

interface Props {
  href?: string
  nextLink?: boolean
  onClick?: (event: React.MouseEvent) => void
  className?: string
}

const defaultProps = {
  nextLink: false,
  className: '',
}

type NativeAttrs = Omit<React.AnchorHTMLAttributes<any>, keyof Props>
type NativeLinkAttrs = Omit<NativeAttrs, keyof LinkBasicProps>
export type BreadcrumbsProps = Props & typeof defaultProps & NativeLinkAttrs

const BreadcrumbsItem = React.forwardRef<
  HTMLAnchorElement,
  React.PropsWithChildren<BreadcrumbsProps>
>(
  (
    { href, nextLink, onClick, children, className, ...props },
    ref: React.Ref<HTMLAnchorElement>,
  ) => {
    const { separator } = useBreadcrumbsContext()
    const isLink = useMemo(() => href !== undefined || nextLink, [href, nextLink])
    const [withoutSepChildren, sepChildren] = pickChild(children, BreadcrumbsSeparator)
    const composeSeparator = useMemo(() => {
      if (React.Children.count(sepChildren) > 0) return sepChildren
      return <BreadcrumbsSeparator>{separator}</BreadcrumbsSeparator>
    }, [separator])

    const clickHandler = (event: React.MouseEvent) => {
      onClick && onClick(event)
    }

    if (!isLink) {
      return (
        <>
          <span className="breadcrums-item" onClick={clickHandler}>
            {withoutSepChildren}
          </span>
          {composeSeparator}
        </>
      )
    }

    return (
      <>
        <Link
          className={`breadcrums-item ${className}`}
          href={href}
          onClick={clickHandler}
          ref={ref}
          {...props}>
          {withoutSepChildren}
        </Link>
        {composeSeparator}
      </>
    )
  },
)

const MemoBreadcrumbsItem = React.memo(BreadcrumbsItem)

export default withDefaults(MemoBreadcrumbsItem, defaultProps)
