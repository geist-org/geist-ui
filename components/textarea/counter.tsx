import React, { useMemo } from 'react'
import useTheme from '../styles/use-theme'

interface CounterProps {
  count: number
  maxLength?: number
}

const defaultProps = { maxLength: undefined }

const Counter: React.FC<React.PropsWithChildren<CounterProps>> = ({ count, maxLength }) => {
  const theme = useTheme()
  const hasLimit = useMemo(() => Number.isInteger(maxLength) && (maxLength as number) > 0, [
    maxLength,
  ])
  return (
    <div className="counter">
      <span className="count">{count}</span>
      {hasLimit && <span className="separator">/</span>}
      {hasLimit && <span className="limit">{maxLength}</span>}
      <style jsx>{`
        .counter {
          display: inline;
          position: absolute;
          bottom: 8px;
          right: 8px;
        }
        .counter .count {
          color: ${hasLimit ? theme.palette.cTheme3 : theme.palette.brand};
        }
        .counter .separator {
          color: ${theme.palette.cTheme3};
        }
        .counter .limit {
          color: ${theme.palette.brand};
        }
      `}</style>
    </div>
  )
}

Counter.defaultProps = defaultProps

export default Counter
