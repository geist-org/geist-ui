import React from 'react'
import { useRouter } from 'next/router'
import useTheme from 'components/use-theme'

export interface Props {
  name: string
  localeName?: string
}

const ActiveCatalog: React.FC<Props> = React.memo(({ name, localeName, ...props }) => {
  const theme = useTheme()
  const { pathname } = useRouter()
  const isActive = pathname.includes(`/${name}/`)

  return (
    <span {...props} className={isActive ? 'active' : ''}>
      {localeName || name}
      <style jsx>{`
        span {
          font-size: 0.8125rem;
          transition: all 0.2s ease;
          color: ${theme.palette.accents_4};
          text-transform: uppercase;
          letter-spacing: 1.3px;
        }

        .active {
          color: ${theme.palette.foreground};
        }
      `}</style>
    </span>
  )
})

export default ActiveCatalog
