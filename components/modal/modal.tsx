import React, {
  useState,
  useEffect,
  useMemo,
  RefObject,
  forwardRef,
  useImperativeHandle,
} from 'react'
import { createPortal } from 'react-dom'
import usePortal from '../utils/use-portal'
import ModalTitle from './modal-title'
import ModalSubtitle from './modal-subtitle'
import ModalWrapper from './modal-wrapper'
import ModalContent from './modal-content'
import ModalAction from './modal-action'
import ModalActions from './modal-actions'
import Backdrop from '../shared/backdrop'
import { ModalConfig, ModalContext, ModalHandles } from './modal-context'
import { pickChild } from '../utils/collections'
import useBodyScroll from '../utils/use-body-scroll'
import useModalHandle from './use-modal-handle'
import ModalIcon from './modal-icon'
import useTheme from '../styles/use-theme'

interface Props {
  disableBackdropClick?: boolean
  onClose?: () => void
  onOpen?: () => void
  open?: boolean
  width?: string
  wrapClassName?: string
  closable?: boolean
}

const defaultProps = {
  width: '30rem',
  wrapClassName: '',
  disableBackdropClick: false,
  closable: false,
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type ModalProps = React.PropsWithChildren<Props & NativeAttrs>
type ModalPropsWithDefault = ModalProps & typeof defaultProps

const Modal = forwardRef<ModalHandles, ModalProps>(
  (
    {
      children,
      disableBackdropClick,
      onClose,
      onOpen,
      open,
      width: wrapperWidth,
      wrapClassName,
      closable,
    }: ModalPropsWithDefault,
    ref: RefObject<ModalHandles>,
  ) => {
    const portal = usePortal('modal')
    const [visible, setVisible] = useState(false)
    const [, setBodyHidden] = useBodyScroll()
    const [withoutActionsChildren, ActionsChildren] = pickChild(children, ModalAction)
    const hasActions = ActionsChildren && React.Children.count(ActionsChildren) > 0
    const theme = useTheme()

    const closeModal = () => {
      onClose && onClose()
      if (open === undefined) {
        setVisible(false)
        setBodyHidden(false)
      }
    }

    useImperativeHandle(ref, () => ({
      setVisible: (visible: boolean = false) => {
        setVisible(visible)
      },
      getVisible: () => visible,
    }))

    useEffect(() => {
      if (open === undefined) return
      if (open) {
        onOpen && onOpen()
      }
      if (!open) {
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
            {closable && (
              <ModalIcon size={16} color={theme.palette.cNeutral5} onClick={closeModal} />
            )}
            {withoutActionsChildren}
            {hasActions && <ModalActions>{ActionsChildren}</ModalActions>}
          </ModalWrapper>
        </Backdrop>
      </ModalContext.Provider>,
      portal,
    )
  },
)

Modal.defaultProps = defaultProps

export default Modal as typeof Modal & {
  Title: typeof ModalTitle
  Subtitle: typeof ModalSubtitle
  Content: typeof ModalContent
  Action: typeof ModalAction
  useModalHandle: typeof useModalHandle
}
