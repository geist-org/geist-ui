import Menu from './menu'
import { Layout } from './layout'

export type LayoutComponentType = typeof Layout & {
  Menu: typeof Menu
}
;(Layout as LayoutComponentType).Menu = Menu

export type { LayoutProps } from './layout'
export default Layout as LayoutComponentType
