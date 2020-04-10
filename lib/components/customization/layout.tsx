import React from 'react'
import { useTheme } from 'components'
import Demo from './demo'

const CustomizationLayout: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const theme = useTheme()

  return (
    <div className="layout">
      <Demo />
      <div className="content">
        {children}
      </div>
      <style jsx>{`
        .layout {
          min-height: calc(100vh - 108px);
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 ${theme.layout.gap};
          display: flex;
          box-sizing: border-box;
        }
        
        .content {
          flex: 1;
        }
        
        .demo {
        
        }
      `}</style>
    </div>
  )
}

export default CustomizationLayout
