import Pagination from './pagination'
import PaginationPrevious from './pagination-previous'
import PaginationNext from './pagination-next'

export type PaginationComponentType = typeof Pagination & {
  Previous: typeof PaginationPrevious
  Next: typeof PaginationNext
}
;(Pagination as PaginationComponentType).Previous = PaginationPrevious
;(Pagination as PaginationComponentType).Next = PaginationNext

export type { PaginationProps } from './pagination'
export type { PaginationPreviousProps } from './pagination-previous'
export type { PaginationNextProps } from './pagination-next'
export default Pagination as PaginationComponentType
