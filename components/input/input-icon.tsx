import React, { useMemo } from 'react'
import useTheme from '../styles/use-theme'

export interface InputIconProps {
  icon: React.ReactNode
  ratio: string
}

const InputIcon: React.FC<InputIconProps> = React.memo(({
  icon, ratio,
}) => {
  const theme = useTheme()
  const width = useMemo(() => {
    return `calc(${ratio} * ${theme.layout.gap} * .42)`
  }, [theme.layout.gap, ratio])
  const padding = useMemo(() => {
    return `calc(${ratio} * ${theme.layout.gap} * .3)`
  }, [theme.layout.gap, ratio])

  return (
    <span>
      {icon}
      <style jsx>{`
        span {
          box-sizing: content-box;
          display: flex;
          width: ${width};
          height: ${width};
          align-items: center;
          vertical-align: center;
          pointer-events: none;
          margin: 0;
          padding: 0 ${padding};
          line-height: 1;
          position: relative;
        }
      `}</style>
    </span>
  )
})

export default InputIcon
