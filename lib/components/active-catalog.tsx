import React from 'react'
import { useRouter } from 'next/router'
import useTheme from 'components/styles/use-theme'

export interface Props {
  name: string
  onClick: React.MouseEventHandler<HTMLElement>
}

const ActiveCatalog: React.FC<Props> = React.memo(
  ({ name, onClick, ...props }) => {
    const theme = useTheme()
    const { pathname } = useRouter()
    const isActive = pathname.includes(`/${name}/`)
    
    return (
      <span {...props} onClick={onClick} className={isActive ? 'active' : ''}>
        {name}
  
        <style jsx>{`
          span {
            font-size: .8rem;
            transition: all .2s ease;
            color: ${theme.palette.accents_3};
            text-transform: uppercase;
          }
          
          .active {
            color: ${theme.palette.accents_6};
          }
        `}</style>
      </span>
    )
  })

export default ActiveCatalog
