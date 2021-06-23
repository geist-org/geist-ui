import Fieldset from './fieldset'
import FieldsetTitle from './fieldset-title'
import FieldsetSubtitle from './fieldset-subtitle'
import FieldsetFooter from './fieldset-footer'
import FieldsetGroup from './fieldset-group'
import FieldsetContent from './fieldset-content'

export type FieldsetComponentType = typeof Fieldset & {
  Title: typeof FieldsetTitle
  Subtitle: typeof FieldsetSubtitle
  Footer: typeof FieldsetFooter
  Group: typeof FieldsetGroup
  Content: typeof FieldsetContent
  Body: typeof FieldsetContent
}
;(Fieldset as FieldsetComponentType).Title = FieldsetTitle
;(Fieldset as FieldsetComponentType).Subtitle = FieldsetSubtitle
;(Fieldset as FieldsetComponentType).Footer = FieldsetFooter
;(Fieldset as FieldsetComponentType).Group = FieldsetGroup
;(Fieldset as FieldsetComponentType).Content = FieldsetContent
;(Fieldset as FieldsetComponentType).Body = FieldsetContent

export type { FieldsetProps } from './fieldset'
export type { FieldsetTitleProps } from './fieldset-title'
export type { FieldsetSubtitleProps } from './fieldset-subtitle'
export type { FieldsetGroupProps } from './fieldset-group'
export type { FieldsetFooterProps } from './fieldset-footer'
export type { FieldsetContentProps } from './fieldset-content'
export default Fieldset as FieldsetComponentType
