import Grid from './grid'
import GridContainer from './grid-container'

export type GridComponentType = typeof Grid & {
  Container: typeof GridContainer
}
;(Grid as GridComponentType).Container = GridContainer

export default Grid as GridComponentType
