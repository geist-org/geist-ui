import React, { useEffect, useMemo } from 'react'
import { createPortal } from 'react-dom'
import usePortal from '../utils/use-portal'
import ModalWrapper from './modal-wrapper'
import ModalAction from './modal-action'
import ModalActions from './modal-actions'
import Backdrop from '../shared/backdrop'
import { ModalConfig, ModalContext } from './modal-context'
import { pickChild } from '../utils/collections'
import useBodyScroll from '../utils/use-body-scroll'
import useCurrentState from '../utils/use-current-state'
import useScaleable, { withScaleable } from '../use-scaleable'

interface Props {
  disableBackdropClick?: boolean
  onClose?: () => void
  onOpen?: () => void
  open?: boolean
  wrapClassName?: string
}

const defaultProps = {
  wrapClassName: '',
  disableBackdropClick: false,
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type ModalProps = Props & NativeAttrs

const ModalComponent: React.FC<React.PropsWithChildren<ModalProps>> = ({
  children,
  disableBackdropClick,
  onClose,
  onOpen,
  open,
  wrapClassName,
}: React.PropsWithChildren<ModalProps> & typeof defaultProps) => {
  const portal = usePortal('modal')
  const { SCALES } = useScaleable()
  const [, setBodyHidden] = useBodyScroll(null, { scrollLayer: true })
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
    if (disableBackdropClick) return
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
      <Backdrop onClick={closeFromBackdrop} visible={visible} width={SCALES.width(26)}>
        <ModalWrapper visible={visible} className={wrapClassName}>
          {withoutActionsChildren}
          {hasActions && <ModalActions>{ActionsChildren}</ModalActions>}
        </ModalWrapper>
      </Backdrop>
    </ModalContext.Provider>,
    portal,
  )
}

ModalComponent.defaultProps = defaultProps
ModalComponent.displayName = 'GeistModal'
const Modal = withScaleable(ModalComponent)
export default Modal
