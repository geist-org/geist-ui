import React from 'react'
import withDefaults from '../utils/with-defaults'
import Link, { LinkInputs, defaultProps } from '../link/link'
import NextLinkSource, { LinkProps as SourceProps } from 'next/link'

const passProps: Array<keyof SourceProps> = [
  'as',
  'href',
  'replace',
  'scroll',
  'shallow',
  'prefetch',
  'passHref',
]

type NativeAttrs = Omit<React.AnchorHTMLAttributes<any>, keyof (LinkInputs & SourceProps)>
export type NextLinkProps = LinkInputs & SourceProps & NativeAttrs

const NextLink: React.FC<React.PropsWithChildren<NextLinkProps>> = ({ children, ...props }) => {
  const nextPassProps = passProps.reduce(
    (pre, key) => {
      if (props[key] === undefined) return pre
      return {
        ...pre,
        [key]: props[key],
      }
    },
    { passHref: true },
  ) as SourceProps
  const linkProps = Object.keys(props).reduce((pre, key: keyof typeof props) => {
    if ((passProps as string[]).includes(`${key}`)) return pre
    return {
      ...pre,
      [key]: props[key],
    }
  }, {})

  return (
    <NextLinkSource {...nextPassProps}>
      <Link {...linkProps}>{children}</Link>
    </NextLinkSource>
  )
}

const MemoNextLink = React.memo(NextLink)

export default withDefaults(MemoNextLink, defaultProps)
