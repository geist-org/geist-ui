import React, { useEffect, useMemo } from 'react'
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
import useCurrentState from '../utils/use-current-state'

interface Props {
  disableBackdropClick?: boolean
  onClose?: () => void
  onOpen?: () => void
  open?: boolean
  width?: string
  wrapClassName?: string
}

const defaultProps = {
  width: '26rem',
  wrapClassName: '',
  disableBackdropClick: false,
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type ModalProps = Props & typeof defaultProps & NativeAttrs

const Modal: React.FC<React.PropsWithChildren<ModalProps>> = ({
  children,
  disableBackdropClick,
  onClose,
  onOpen,
  open,
  width: wrapperWidth,
  wrapClassName,
}) => {
  const portal = usePortal('modal')
  const [, setBodyHidden] = useBodyScroll()
  const [visible, setVisible, visibleRef] = useCurrentState<boolean>(false)
  const [withoutActionsChildren, ActionsChildren] = pickChild(children, ModalAction)
  const hasActions = ActionsChildren && React.Children.count(ActionsChildren) > 0

  const closeModal = () => {
    onClose && onClose()
    setVisible(false)
    setBodyHidden(false)
  }

  useEffect(() => {
    if (open === undefined) return
    if (open) {
      onOpen && onOpen()
    }
    if (!open && visibleRef.current) {
      onClose && onClose()
    }

    setVisible(open)
    setBodyHidden(open)
  }, [open])

  const closeFromBackdrop = () => {
    if (disableBackdropClick && hasActions) return
    closeModal()
  }

  const modalConfig: ModalConfig = useMemo(
    () => ({
      close: closeModal,
    }),
    [],
  )

  if (!portal) return null
  return createPortal(
    <ModalContext.Provider value={modalConfig}>
      <Backdrop onClick={closeFromBackdrop} visible={visible}>
        <ModalWrapper visible={visible} className={wrapClassName} width={wrapperWidth}>
          {withoutActionsChildren}
          {hasActions && <ModalActions>{ActionsChildren}</ModalActions>}
        </ModalWrapper>
      </Backdrop>
    </ModalContext.Provider>,
    portal,
  )
}

type ModalComponent<P = {}> = React.FC<P> & {
  Title: typeof ModalTitle
  Subtitle: typeof ModalSubtitle
  Content: typeof ModalContent
  Action: typeof ModalAction
}
type ComponentProps = Partial<typeof defaultProps> &
  Omit<Props, keyof typeof defaultProps> &
  NativeAttrs

Modal.defaultProps = defaultProps

export default Modal as ModalComponent<ComponentProps>
