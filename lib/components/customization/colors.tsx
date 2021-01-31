import React from 'react'
import { Card, useTheme } from 'components'
import { CardTypes } from 'components/utils/prop-types'

const types = [
  'secondary',
  'success',
  'warning',
  'error',
  'dark',
  'alert',
  'purple',
  'violet',
  'cyan',
  'lite',
]

const Colors: React.FC<React.PropsWithChildren<unknown>> = () => {
  const theme = useTheme()

  return (
    <div className="colors">
      {types.map((type, index) => {
        return (
          <div key={`${type}-${index}`} className="color-card">
            <Card type={type as CardTypes}>{type}</Card>
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
