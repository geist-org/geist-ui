import React from 'react'
import { useTheme } from 'components'
import { addColorAlpha } from 'components/utils/color'

const GridDemo: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const theme = useTheme()
  const bgColor = addColorAlpha(theme.palette.accents_2, 0.5)
  return (
    <div className="grid-demo">
      {children}
      <style jsx>{`
        .grid-demo {
          background: transparent;
          background-image: linear-gradient(${bgColor} 1px, transparent 0),
            linear-gradient(90deg, ${bgColor} 1px, transparent 0);
          background-size: 15px 15px, 15px 15px, 75px 75px, 75px 75px;
          border: 2px solid ${bgColor};
          border-radius: 4px;
          overflow: hidden;
          width: 500px;
          height: 150px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-bottom: 15px;
        }
        .grid-demo :global(> *) {
          margin-bottom: 15px;
        }
        .grid-demo :global(> *:last-of-type) {
          margin-bottom: 0;
        }
      `}</style>
    </div>
  )
}

export default GridDemo
