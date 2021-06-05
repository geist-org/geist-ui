import React, { useMemo } from 'react'
import useTheme from '../use-theme'
import GridBasicItem, { GridBasicItemProps } from './basic-item'
import { Wrap } from './grid-types'
import { css } from 'styled-jsx/css'

interface Props {
  gap?: number
  wrap?: Wrap
  className?: string
}

const defaultProps = {
  gap: 0,
  wrap: 'wrap' as Wrap,
  className: '',
}

export type GridContainerProps = Props & GridBasicItemProps

const GridContainer: React.FC<React.PropsWithChildren<GridContainerProps>> = ({
  gap,
  wrap,
  children,
  className,
  ...props
}: React.PropsWithChildren<GridContainerProps> & typeof defaultProps) => {
  const theme = useTheme()
  const gapUnit = useMemo(() => {
    return `calc(${gap} * ${theme.layout.gapQuarter})`
  }, [gap, theme.layout.gapQuarter])
  const { className: resolveClassName, styles } = css.resolve`
    --gaid-gap-unit: ${gapUnit};
    display: flex;
    flex-wrap: ${wrap};
    box-sizing: border-box;
    margin: calc(-1 * var(--gaid-gap-unit));
    width: calc(100% + var(--gaid-gap-unit) * 2);
  `

  return (
    <GridBasicItem className={`${resolveClassName} ${className}`} {...props}>
      {children}
      {styles}
    </GridBasicItem>
  )
}

GridContainer.defaultProps = defaultProps
GridContainer.displayName = 'GeistGridContainer'
export default GridContainer
