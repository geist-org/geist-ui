import React from 'react'
import { useTheme, Row } from 'components'
import CustomizationCodes from './codes'
import Demo from './demo'

const CustomizationLayout: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const theme = useTheme()

  return (
    <div className="layout">
      <Row>
        <Demo />
        <div className="content">
          {children}
        </div>
      </Row>
      <Row>
        <CustomizationCodes />
      </Row>
      
      <style jsx>{`
        .layout {
          min-height: calc(100vh - 108px);
          max-width: ${theme.layout.pageWidthWithMargin};
          margin: 0 auto;
          padding: 0 ${theme.layout.gap};
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
        }
        
        .content {
          flex: 1;
          overflow: hidden;
        }
        
        .demo {
        
        }
      `}</style>
    </div>
  )
}

export default CustomizationLayout
