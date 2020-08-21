import React from 'react'
import { Card, useTheme } from 'components'
import { CardColors } from 'components/utils/prop-types'

const colors = ['primary', 'success', 'warning', 'error']

const Colors: React.FC<React.PropsWithChildren<{}>> = () => {
  const theme = useTheme()

  return (
    <div className="colors">
      {colors.map((color, index) => {
        return (
          <div key={`${color}-${index}`} className="color-card">
            <Card color={color as CardColors}>{color}</Card>
          </div>
        )
      })}
      <style jsx>{`
        .colors {
          display: flex;
          flex-wrap: wrap;
        }

        .color-card {
          display: flex;
          width: 9rem;
          margin-right: ${theme.layout.gapHalf};
          margin-bottom: ${theme.layout.gapHalf};
        }
      `}</style>
    </div>
  )
}

export default Colors
