import React from 'react'
import css from 'styled-jsx/css'
import GridBasicItem, { GridBasicItemProps } from './basic-item'
import useScale, { withScale } from '../use-scale'
import useClasses from '../use-classes'

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
  const { SCALES } = useScale()
  const { className: resolveClassName, styles } = css.resolve`
    div {
      margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
      box-sizing: border-box;
      padding: ${SCALES.pt(0, 'var(--grid-gap-unit)')}
        ${SCALES.pr(0, 'var(--grid-gap-unit)')} ${SCALES.pb(0, 'var(--grid-gap-unit)')}
        ${SCALES.pl(0, 'var(--grid-gap-unit)')};
    }
  `
  const classes = useClasses(resolveClassName, className)

  return (
    <GridBasicItem className={classes} {...props}>
      {children}
      {styles}
    </GridBasicItem>
  )
}

GridComponent.defaultProps = defaultProps
GridComponent.displayName = 'GeistGrid'
const Grid = withScale(GridComponent)
export default Grid
