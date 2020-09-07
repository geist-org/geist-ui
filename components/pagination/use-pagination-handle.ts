import { useRef, RefObject } from 'react'
import { PaginationHandles } from './pagination-context'

const usePaginationHandle = () => {
  const ref: RefObject<PaginationHandles> = useRef(null)
  return {
    setPage(value: number) {
      return ref.current?.setPage(value)
    },
    getPage() {
      return ref.current?.getPage()
    },
    setPageSize(value: number) {
      return ref.current?.setPageSize(value)
    },
    getPageSize() {
      return ref.current?.getPageSize()
    },
    ref,
  }
}

export default usePaginationHandle
