import React from 'react'
import css from 'styled-jsx/css'
import GridBasicItem, { GridBasicItemProps } from './basic-item'
import useScaleable, { withScaleable } from '../use-scaleable'

interface Props {
  className?: string
}

const defaultProps = {
  className: '',
}

export type GridProps = Props & GridBasicItemProps

const GridComponent: React.FC<React.PropsWithChildren<GridProps>> = ({
  children,
  className,
  ...props
}: React.PropsWithChildren<GridProps> & typeof defaultProps) => {
  const { SCALES } = useScaleable()
  const { className: resolveClassName, styles } = css.resolve`
    margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
    box-sizing: border-box;
    padding: ${SCALES.pt(0, 'var(--gaid-gap-unit)')}
      ${SCALES.pr(0, 'var(--gaid-gap-unit)')} ${SCALES.pb(0, 'var(--gaid-gap-unit)')}
      ${SCALES.pl(0, 'var(--gaid-gap-unit)')};
  `
  return (
    <GridBasicItem className={`${resolveClassName} ${className}`} {...props}>
      {children}
      {styles}
    </GridBasicItem>
  )
}

GridComponent.defaultProps = defaultProps
GridComponent.displayName = 'GeistGrid'
const Grid = withScaleable(GridComponent)
export default Grid
