import React from 'react'
import { useTheme, Grid } from 'components'
import CustomizationCodes from './codes'
import Demo from './demo'

const CustomizationLayout: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const theme = useTheme()

  return (
    <div className="layout">
      <Grid.Container>
        <Grid xs={24}>
          <Demo />
          <div className="content">{children}</div>
        </Grid>
        <Grid xs={24}>
          <CustomizationCodes />
        </Grid>
      </Grid.Container>

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
      `}</style>
    </div>
  )
}

export default CustomizationLayout
