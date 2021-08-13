import Grid from './grid'
import GridContainer from './grid-container'

export type GridComponentType = typeof Grid & {
  Container: typeof GridContainer
}
;(Grid as GridComponentType).Container = GridContainer

export type { GridContainerProps } from './grid-container'
export type { GridProps } from './grid'
export type { GridBreakpointsValue } from './basic-item'
export type {
  GridAlignContent,
  GridAlignItems,
  GridDirection,
  GridJustify,
  GridWrap,
} from './grid-types'
export default Grid as GridComponentType
