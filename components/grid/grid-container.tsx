import React, { useMemo } from 'react'
import useTheme from '../styles/use-theme'
import GridBasicItem, { GridBasicItemProps } from './basic-item'
import { Wrap } from './grid-props'

interface Props {
  gap: number
  wrap: Wrap
  className: string
}

const defaultProps = {
  gap: 0,
  wrap: 'wrap' as Wrap,
  className: '',
}

export type GridContainerProps = Props & typeof defaultProps & GridBasicItemProps

const GridContainer: React.FC<React.PropsWithChildren<GridContainerProps>> = ({
  gap,
  wrap,
  children,
  className,
  ...props
}) => {
  const theme = useTheme()
  const gapUnit = useMemo(() => {
    return `calc(${gap} * ${theme.layout.gapQuarter})`
  }, [gap, theme.layout.gapQuarter])

  return (
    <GridBasicItem className={`container ${className}`} {...props}>
      {children}
      <style jsx>{`
        :global(.container) {
          --gaid-gap-unit: ${gapUnit};
          display: flex;
          flex-wrap: ${wrap};
          box-sizing: border-box;
          margin: calc(-1 * var(--gaid-gap-unit));
          width: calc(100% + var(--gaid-gap-unit) * 2);
        }
      `}</style>
    </GridBasicItem>
  )
}

type MemoGridContainerComponent<P = {}> = React.NamedExoticComponent<P>
type ComponentProps = Partial<typeof defaultProps> &
  Omit<Props, keyof typeof defaultProps> &
  GridBasicItemProps

GridContainer.defaultProps = defaultProps

export default React.memo(GridContainer) as MemoGridContainerComponent<ComponentProps>
