import React, { Children, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useConfigs from 'lib/states/use-config'

export interface Props {
  onAcitve?: Function
  index: number
  total: number
  href: string
}

const ActiveLink: React.FC<React.PropsWithChildren<Props>> = React.memo(
  ({ children, index, href }) => {
    const { updateShouldScroll } = useConfigs()
    const { asPath } = useRouter()
    const isActive = asPath === href
    const child = Children.only(children)
    
    useEffect(() => {
      if (!isActive) return
      updateShouldScroll && updateShouldScroll(index > 16)
    }, [isActive])

    return (
      <Link href={href}>
        {React.cloneElement(child as React.ReactElement, {
          className: isActive ? 'active' : null,
        })}
      </Link>
    )
  })

export default ActiveLink
