import React from 'react'
import { Button, useTheme } from 'components'
import SlidersIcon from '@geist-ui/react-icons/sliders'

interface Props {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const TabbarMobile: React.FC<Props> = ({ onClick }) => {
  const theme = useTheme()
  const handler = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick && onClick(event)
  }

  return (
    <div className="tabbar">
      <Button className="toggle" auto type="abort" onClick={handler}>
        <SlidersIcon size={14} />
      </Button>
      <span className="geist-wordmark">Geist</span>
      <style jsx>{`
        .tabbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 950;
          height: var(--geist-page-nav-height);
          background-color: ${theme.palette.accents_1};
          display: flex;
          align-items: center;
          padding: 0 20px;
          box-sizing: border-box;
          justify-content: space-between;
          border-bottom: 1px solid ${theme.palette.border};
          box-shadow: ${theme.expressiveness.shadowSmall};
        }

        .tabbar :global(.toggle) {
          width: 40px;
          height: 40px;
          padding: 0;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          color: ${theme.palette.accents_6};
        }

        .geist-wordmark {
          color: ${theme.palette.foreground};
          font-size: 1rem;
          font-weight: 500;
          padding-right: 5px;
          display: inline-flex;
          user-select: none;
          letter-spacing: 0.4px;
        }

        @media only screen and (min-width: ${theme.layout.breakpointMobile}) {
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
