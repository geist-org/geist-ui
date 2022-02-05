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

        @media only screen and (max-width: ${theme.layout.breakpointMobile}) {
          span {
            color: ${theme.palette.foreground};
            letter-spacing: unset;
            display: inline-block;
            font-weight: 800;
            font-size: 1.375rem;
            padding: ${theme.layout.unit} 0 0;
            text-transform: none;
          }
        }
      `}</style>
    </span>
  )
})

export default ActiveCatalog
