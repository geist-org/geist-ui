import React from 'react'
import { useTheme } from 'components'
import ToggleIcon from '../icons/toggle'

interface Props {
  onClick?: (e: React.MouseEvent<SVGElement>) => void
}

const TabbarMobile:React.FC<Props> = ({ onClick }) => {
  const theme = useTheme()
  const handler = (event: React.MouseEvent<SVGElement>) => {
    onClick && onClick(event)
  }

  return (
    <div className="tabbar">
      <ToggleIcon color={theme.palette.accents_7} onClick={handler} />
      <span>ZEIT-UI React</span>
      <style jsx>{`
        .tabbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 10000;
          height: 3.7rem;
          background-color: ${theme.palette.background};
          display: flex;
          align-items: center;
          padding: 0 calc(${theme.layout.gap} * 2);
          box-sizing: border-box;
          justify-content: space-between;
          box-shadow: ${theme.expressiveness.shadowMedium};
        }
        
        span {
          color: ${theme.palette.accents_7};
          font-size: .75rem;
          display: inline-flex;
          text-transform: capitalize;
        }
        
        @media only screen and (min-width: 767px) {
          .tabbar {
            display: none;
            visibility: hidden;
            top: -1000px;
          }
        }
      `}</style>
    </div>
  )
}

export default TabbarMobile
