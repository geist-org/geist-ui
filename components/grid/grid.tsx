import React from 'react'
import { css } from 'styled-jsx/css'
import GridBasicItem, { GridBasicItemProps } from './basic-item'

interface Props {
  className?: string
}

const defaultProps = {
  className: '',
}

export type GridProps = Props & GridBasicItemProps

const Grid: React.FC<React.PropsWithChildren<GridProps>> = ({
  children,
  className,
  ...props
}: React.PropsWithChildren<GridProps> & typeof defaultProps) => {
  const { className: resolveClassName, styles } = css.resolve`
    margin: 0;
    box-sizing: border-box;
    padding: var(--gaid-gap-unit);
  `
  return (
    <GridBasicItem className={`${resolveClassName} ${className}`} {...props}>
      {children}
      {styles}
    </GridBasicItem>
  )
}

Grid.defaultProps = defaultProps
Grid.displayName = 'GeistGrid'
export default Grid
