import Tabs from './tabs'
import TabsItem from './tabs-item'

export type TabsComponentType = typeof Tabs & {
  Item: typeof TabsItem
  Tab: typeof TabsItem
}
;(Tabs as TabsComponentType).Item = TabsItem
;(Tabs as TabsComponentType).Tab = TabsItem

export type { TabsProps } from './tabs'
export default Tabs as TabsComponentType
