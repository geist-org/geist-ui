import React, { useMemo } from 'react'
import GridBasicItem, { GridBasicItemProps } from './basic-item'
import { GridWrap } from './grid-types'
import css from 'styled-jsx/css'
import useScale, { withScale } from '../use-scale'
import useClasses from '../use-classes'

interface Props {
  gap?: number
  wrap?: GridWrap
  className?: string
}

const defaultProps = {
  gap: 0,
  wrap: 'wrap' as GridWrap,
  className: '',
}

export type GridContainerProps = Props & GridBasicItemProps

const GridContainerComponent: React.FC<React.PropsWithChildren<GridContainerProps>> = ({
  gap,
  wrap,
  children,
  className,
  ...props
}: React.PropsWithChildren<GridContainerProps> & typeof defaultProps) => {
  const { unit, SCALES } = useScale()
  const gapUnit = useMemo(() => `calc(${gap} * ${unit} * 1/3)`, [gap, unit])
  const { className: resolveClassName, styles } = css.resolve`
    div {
      --grid-gap-unit: ${gapUnit};
      --grid-container-margin: calc(-1 * var(--grid-gap-unit));
      --grid-container-width: calc(100% + var(--grid-gap-unit) * 2);
      display: flex;
      flex-wrap: ${wrap};
      box-sizing: border-box;
      width: ${SCALES.width(1, 'var(--grid-container-width)')};
      margin: ${SCALES.mt(0, 'var(--grid-container-margin)')}
        ${SCALES.mr(0, 'var(--grid-container-margin)')}
        ${SCALES.mb(0, 'var(--grid-container-margin)')}
        ${SCALES.ml(0, 'var(--grid-container-margin)')};
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

GridContainerComponent.defaultProps = defaultProps
GridContainerComponent.displayName = 'GeistGridContainer'
const GridContainer = withScale(GridContainerComponent)
export default GridContainer
