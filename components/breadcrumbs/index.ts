import Breadcrumbs from './breadcrumbs'
import BreadcrumbsItem from './breadcrumbs-item'
import BreadcrumbsSeparator from './breadcrumbs-separator'

export type BreadcrumbsComponentType = typeof Breadcrumbs & {
  Item: typeof BreadcrumbsItem
  Separator: typeof BreadcrumbsSeparator
}
;(Breadcrumbs as BreadcrumbsComponentType).Item = BreadcrumbsItem
;(Breadcrumbs as BreadcrumbsComponentType).Separator = BreadcrumbsSeparator

export default Breadcrumbs as BreadcrumbsComponentType
