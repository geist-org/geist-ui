import Modal from './modal'
import ModalTitle from './modal-title'
import ModalSubtitle from './modal-subtitle'
import ModalContent from './modal-content'
import ModalAction from './modal-action'

export type ModalComponentType = typeof Modal & {
  Title: typeof ModalTitle
  Subtitle: typeof ModalSubtitle
  Content: typeof ModalContent
  Action: typeof ModalAction
}
;(Modal as ModalComponentType).Title = ModalTitle
;(Modal as ModalComponentType).Subtitle = ModalSubtitle
;(Modal as ModalComponentType).Content = ModalContent
;(Modal as ModalComponentType).Action = ModalAction

export type { ModalProps } from './modal'
export type { ModalTitleProps } from './modal-title'
export type { ModalSubtitleProps } from './modal-subtitle'
export type { ModalActionProps } from './modal-action'
export type { ModalContentProps } from './modal-content'
export type { ModalHooksBindings } from './use-modal'
export default Modal as ModalComponentType
