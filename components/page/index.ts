import Page from './page'
import PageHeader from './page-header'
import PageContent from './page-content'
import PageFooter from './page-footer'

export type PageComponentType = typeof Page & {
  Header: typeof PageHeader
  Content: typeof PageContent
  Body: typeof PageContent
  Footer: typeof PageFooter
}
;(Page as PageComponentType).Header = PageHeader
;(Page as PageComponentType).Content = PageContent
;(Page as PageComponentType).Body = PageContent
;(Page as PageComponentType).Footer = PageFooter

export default Page as PageComponentType
