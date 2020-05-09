import React from 'react'
import GridContainer from './grid-container'
import GridBasicItem, { GridBasicItemComponentProps } from './basic-item'

interface Props {
  className: string
}

const defaultProps = {
  className: '',
}

export type GridProps = Props & typeof defaultProps & GridBasicItemComponentProps

const Grid: React.FC<React.PropsWithChildren<GridProps>> = ({ children, className, ...props }) => {
  return (
    <GridBasicItem className={`gaid-item ${className}`} {...props}>
      {children}
      <style jsx>{`
        :global(.gaid-item) {
          margin: 0;
          box-sizing: border-box;
          padding: var(--gaid-gap-unit);
        }
      `}</style>
    </GridBasicItem>
  )
}

type MemoGridComponent<P = {}> = React.NamedExoticComponent<P> & {
  Container: typeof GridContainer
}
type ComponentProps = Partial<typeof defaultProps> &
  Omit<Props, keyof typeof defaultProps> &
  GridBasicItemComponentProps

Grid.defaultProps = defaultProps

export default React.memo(Grid) as MemoGridComponent<ComponentProps>
