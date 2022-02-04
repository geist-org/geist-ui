import Link from '../link'
import { Props as LinkBasicProps } from '../link/link'
import React, { useMemo } from 'react'
import { pickChild } from '../utils/collections'
import BreadcrumbsSeparator from './breadcrumbs-separator'
import useClasses from '../use-classes'

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
export type BreadcrumbsItemProps = Props & NativeLinkAttrs

const BreadcrumbsItem = React.forwardRef<
  HTMLAnchorElement,
  React.PropsWithChildren<BreadcrumbsItemProps>
>(
  (
    {
      href,
      nextLink,
      onClick,
      children,
      className,
      ...props
    }: BreadcrumbsItemProps & typeof defaultProps,
    ref: React.Ref<HTMLAnchorElement>,
  ) => {
    const isLink = useMemo(() => href !== undefined || nextLink, [href, nextLink])
    const [withoutSepChildren] = pickChild(children, BreadcrumbsSeparator)
    const classes = useClasses('breadcrumbs-item', className)

    const clickHandler = (event: React.MouseEvent) => {
      onClick && onClick(event)
    }

    if (!isLink) {
      return (
        <span className={classes} onClick={clickHandler}>
          {withoutSepChildren}
        </span>
      )
    }

    return (
      <Link className={classes} href={href} onClick={clickHandler} ref={ref} {...props}>
        {withoutSepChildren}
      </Link>
    )
  },
)

BreadcrumbsItem.defaultProps = defaultProps
BreadcrumbsItem.displayName = 'GeistBreadcrumbsItem'
export default BreadcrumbsItem
