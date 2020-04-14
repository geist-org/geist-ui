import React from 'react'
import withDefaults from '../utils/with-defaults'
import useWarning from '../utils/use-warning'

interface Props {
  x?: number
  y?: number
  inline?: boolean
  className?: string
}

const defaultProps = {
  x: 1,
  y: 1,
  inline: false,
  className: ''
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type SpacerProps = Props & typeof defaultProps & NativeAttrs

export const getMargin = (num: number): string => {
  if (num < 0) {
    useWarning('Props "x"/"y" must be greater than or equal to 0', 'Spacer')
    return '0'
  }
  return `calc(${num * 15.25}pt + 1px * ${num - 1})`
}

const Spacer: React.FC<SpacerProps> = React.memo(({
  x, y, inline, className, ...props
}) => {
  const left = getMargin(x)
  const top = getMargin(y)
  
  return (
    <span className={className} {...props}>
      <style jsx>{`
        span {
          display: ${inline ? 'inline-block' : 'block'};
          height: 1px;
          width: 1px;
          margin-left: ${left};
          margin-top: ${top};
        }
      `}</style>
    </span>
  )
})

export default withDefaults(Spacer, defaultProps)
