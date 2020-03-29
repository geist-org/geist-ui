import React, { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import usePortal from '../utils/use-portal'
import ModalTitle from './modal-title'
import ModalSubtitle from './modal-subtitle'
import ModalWrapper from './modal-wrapper'
import ModalContent from './modal-content'
import ModalAction from './modal-action'
import ModalActions from './modal-actions'
import Backdrop from '../shared/backdrop'
import { ModalConfig, ModalContext } from './modal-context'
import { pickChild } from '../utils/collections'
import useBodyScroll from '../utils/use-body-scroll'

interface Props {
  disableBackdropClick?: boolean
  onClose: () => void
  onOpen: () => void
  open?: boolean
}

const defaultProps = {
  disableBackdropClick: false,
  onClose: () => {},
  onOpen: () => {},
  open: false,
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type ModalProps = Props & typeof defaultProps & NativeAttrs

const Modal: React.FC<React.PropsWithChildren<ModalProps>> = React.memo(({
  children, disableBackdropClick, onClose, onOpen, open
}) => {
  const portal = usePortal('modal')
  const [, setBodyHidden] = useBodyScroll()
  const [visible, setVisible] = useState<boolean>(open)
  const [withoutActionsChildren, ActionsChildren] = pickChild(children, ModalAction)
  const hasActions = ActionsChildren && React.Children.count(ActionsChildren) > 0

  const closeModal = () => {
    setVisible(false)
    onClose && onClose()
  }
  const openModal = () => {
    setVisible(true)
    
    onOpen && onOpen()
  }

  useEffect(() => {
    setVisible(open)
    setBodyHidden(open)
  }, [open])

  const closeFromBackdrop = () => {
    if (disableBackdropClick && hasActions) return
    closeModal()
  }

  const modalConfig: ModalConfig = useMemo(() => ({
    close: closeModal,
    open: openModal,
  }), [])
  
  if (!portal) return null
  return createPortal(
    (
      <ModalContext.Provider value={modalConfig}>
        <Backdrop onClick={closeFromBackdrop} visible={visible} offsetY={25}>
          <ModalWrapper visible={visible}>
            {withoutActionsChildren}
            {hasActions && <ModalActions>{ActionsChildren}</ModalActions>}
          </ModalWrapper>
        </Backdrop>
      </ModalContext.Provider>
    ), portal
  )
})

Modal.defaultProps = defaultProps

type ModalComponent<P = {}> = React.FC<P> & {
  Title: typeof ModalTitle
  Subtitle: typeof ModalSubtitle
  Content: typeof ModalContent
  Action: typeof ModalAction
}

type ComponentProps = Partial<typeof defaultProps> & Omit<Props, keyof typeof defaultProps>

export default Modal as ModalComponent<ComponentProps>
