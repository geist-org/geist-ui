import React, { useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTheme } from 'components'

export interface Props {
  onAcitve?: Function
  href: string
  text: string
}

const ActiveLink: React.FC<Props> = React.memo(({ href, text }) => {
  const theme = useTheme()
  const { pathname } = useRouter()
  const [title, subtitle] = useMemo(() => {
    if (!/[\u4E00-\u9FA5]/.test(text)) return [text, null]
    if (/zeit|ui|ZEIT|UI/.test(text)) return [text, null]
    return [text.replace(/[^\u4E00-\u9FA5]/g, ''), text.replace(/[^a-zA-Z]/g, '')]
  }, [text])
  const isActive = pathname === href

  return (
    <div className="link">
      <Link href={href}>
        <a className={isActive ? 'active' : ''}>
          {title}
          {subtitle && <span>&nbsp;{subtitle}</span>}
        </a>
      </Link>
      <style jsx>{`
        .link {
          width: 100%;
          color: ${theme.palette.accents_5};
          display: flex;
          height: 2.25rem;
          align-items: center;
          justify-content: flex-start;
          cursor: pointer;
          text-transform: capitalize;
        }

        a {
          color: ${theme.palette.accents_7};
          font-size: 1rem;
          transition: all 200ms ease;
          font-weight: 400;
          display: inline-flex;
          align-items: baseline;
        }

        a.active {
          color: ${theme.palette.success};
          font-weight: 600;
        }

        a.active span {
          color: ${theme.palette.successLight};
        }

        span {
          font-size: 0.75rem;
          color: ${theme.palette.accents_4};
          font-weight: 400;
        }
      `}</style>
    </div>
  )
})

export default ActiveLink
