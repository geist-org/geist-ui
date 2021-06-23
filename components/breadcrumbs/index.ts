import Breadcrumbs from './breadcrumbs'
import BreadcrumbsItem from './breadcrumbs-item'
import BreadcrumbsSeparator from './breadcrumbs-separator'

export type BreadcrumbsComponentType = typeof Breadcrumbs & {
  Item: typeof BreadcrumbsItem
  Separator: typeof BreadcrumbsSeparator
}
;(Breadcrumbs as BreadcrumbsComponentType).Item = BreadcrumbsItem
;(Breadcrumbs as BreadcrumbsComponentType).Separator = BreadcrumbsSeparator

export type { BreadcrumbsProps } from './breadcrumbs'
export type { BreadcrumbsItemProps } from './breadcrumbs-item'
export type { BreadcrumbsSeparatorProps } from './breadcrumbs-separator'
export default Breadcrumbs as BreadcrumbsComponentType
