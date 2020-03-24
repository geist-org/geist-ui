import React from 'react'
import { useRouter } from 'next/router'
import useTheme from 'components/styles/use-theme'

export interface Props {
  name: string
}

const ActiveCatalog: React.FC<Props> = React.memo(
  ({ name, ...props }) => {
    const theme = useTheme()
    const { pathname } = useRouter()
    const isActive = pathname.includes(`/${name}/`)
    
    return (
      <span {...props} className={isActive ? 'active' : ''}>
        {name}
        <style jsx>{`
          span {
            font-size: .9rem;
            transition: all .2s ease;
            color: ${theme.palette.accents_3};
            text-transform: uppercase;
            padding-bottom: .5rem;
          }
          
          .active {
            color: ${theme.palette.accents_6};
          }
        `}</style>
      </span>
    )
  })

export default ActiveCatalog
