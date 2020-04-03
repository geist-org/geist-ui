import React, { Children } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export interface Props {
  onAcitve?: Function
  href: string
}

const ActiveLink: React.FC<React.PropsWithChildren<Props>> = React.memo(
  ({ children, href }) => {
    const { pathname } = useRouter()
    const isActive = pathname === href
    const child = Children.only(children)

    return (
      <Link href={href}>
        {React.cloneElement(child as React.ReactElement, {
          className: isActive ? 'active' : null,
        })}
      </Link>
    )
  })

export default ActiveLink
