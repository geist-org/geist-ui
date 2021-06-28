import React, { useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTheme } from 'components'

export interface Props {
  onAcitve?: () => void
  href: string
  text: string
}

const ActiveLink: React.FC<Props> = React.memo(({ href, text }) => {
  const theme = useTheme()
  const { pathname } = useRouter()
  const [title, subtitle] = useMemo(() => {
    if (!/[\u4E00-\u9FA5]/.test(text)) return [text, null]
    if (/zeit|ui|ZEIT|geist|Geist|UI/.test(text)) return [text, null]
    return [text.replace(/[^\u4E00-\u9FA5]/g, ''), text.replace(/[^a-zA-Z]/g, '')]
  }, [text])
  const isActive = pathname === href

  return (
    <>
      <Link href={href}>
        <a className={`link ${isActive ? 'active' : ''}`}>
          {title}
          {subtitle && <span>&nbsp;{subtitle}</span>}
        </a>
      </Link>
      <style jsx>{`
        a {
          font: inherit;
        }

        .link {
          display: flex;
          align-items: baseline;
          font-size: 1rem;
          color: ${theme.palette.accents_6};
          padding: calc(${theme.layout.unit} * 0.375) 0;
          transition: all 200ms ease;
        }

        span {
          font-size: 0.75rem;
          color: ${theme.palette.accents_4};
          font-weight: 400;
        }

        .link.active {
          color: ${theme.palette.success};
          font-weight: 600;
        }

        .link.active span {
          color: ${theme.palette.successLight};
        }

        @media only screen and (max-width: ${theme.layout.breakpointMobile}) {
          .link {
            color: ${theme.palette.foreground};
            padding: calc(${theme.layout.unit} * 0.875) 0;
            border-bottom: 1px solid ${theme.palette.border};
            user-select: none;
          }
          .link.active {
            font-weight: 700;
          }
        }
      `}</style>
    </>
  )
})

export default ActiveLink
