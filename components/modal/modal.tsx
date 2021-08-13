import React, { MouseEvent, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import usePortal from '../utils/use-portal'
import ModalWrapper from './modal-wrapper'
import ModalAction from './modal-action'
import ModalActions from './modal-actions'
import Backdrop from '../shared/backdrop'
import { ModalConfig, ModalContext } from './modal-context'
import { pickChild } from '../utils/collections'
import useBodyScroll from '../utils/use-body-scroll'
import useScaleable, { withScaleable } from '../use-scaleable'
import useKeyboard, { KeyCode } from '../use-keyboard'

interface Props {
  disableBackdropClick?: boolean
  onClose?: () => void
  onContentClick?: (event: MouseEvent<HTMLElement>) => void
  visible?: boolean
  keyboard?: boolean
  wrapClassName?: string
}

const defaultProps = {
  wrapClassName: '',
  keyboard: true,
  disableBackdropClick: false,
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type ModalProps = Props & NativeAttrs

const ModalComponent: React.FC<React.PropsWithChildren<ModalProps>> = ({
  visible: customVisible,
  onClose,
  children,
  keyboard,
  wrapClassName,
  onContentClick,
  disableBackdropClick,
}: React.PropsWithChildren<ModalProps> & typeof defaultProps) => {
  const portal = usePortal('modal')
  const { SCALES } = useScaleable()
  const [, setBodyHidden] = useBodyScroll(null, { scrollLayer: true })
  const [visible, setVisible] = useState<boolean>(false)
  const [withoutActionsChildren, ActionsChildren] = pickChild(children, ModalAction)
  const hasActions = ActionsChildren && React.Children.count(ActionsChildren) > 0
  const closeModal = () => {
    onClose && onClose()
    setVisible(false)
    setBodyHidden(false)
  }

  useEffect(() => {
    if (typeof customVisible === 'undefined') return
    setVisible(customVisible)
    setBodyHidden(customVisible)
  }, [customVisible])

  const { bindings } = useKeyboard(
    () => {
      keyboard && closeModal()
    },
    KeyCode.Escape,
    {
      disableGlobalEvent: true,
    },
  )

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
      <Backdrop
        onClick={closeFromBackdrop}
        onContentClick={onContentClick}
        visible={visible}
        width={SCALES.width(26)}
        {...bindings}>
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
