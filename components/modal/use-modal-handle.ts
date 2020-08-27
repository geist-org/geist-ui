import { useRef, RefObject } from 'react'
import { ModalHandles } from './modal-context'

const useModalHandle = () => {
  const ref: RefObject<ModalHandles> = useRef(null)
  return {
    setVisible(visible: boolean = false) {
      return ref.current?.setVisible(visible)
    },
    getVisible() {
      return ref.current?.getVisible()
    },
    ref,
  }
}

export default useModalHandle
