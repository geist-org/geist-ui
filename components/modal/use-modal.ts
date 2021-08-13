import { Dispatch, MutableRefObject, SetStateAction } from 'react'
import useCurrentState from '../utils/use-current-state'
import { ModalProps } from '../modal'

export type ModalHooksBindings = Pick<ModalProps, 'visible' | 'onClose'>

const useModal = (
  initialVisible: boolean = false,
): {
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
  currentRef: MutableRefObject<boolean>
  bindings: ModalHooksBindings
} => {
  const [visible, setVisible, currentRef] = useCurrentState<boolean>(initialVisible)

  return {
    visible,
    setVisible,
    currentRef,
    bindings: {
      visible,
      onClose: () => setVisible(false),
    },
  }
}

export default useModal
