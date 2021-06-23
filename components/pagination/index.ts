import Pagination from './pagination'
import PaginationPrevious from './pagination-previous'
import PaginationNext from './pagination-next'

export type PaginationComponentType = typeof Pagination & {
  Previous: typeof PaginationPrevious
  Next: typeof PaginationNext
}
;(Pagination as PaginationComponentType).Previous = PaginationPrevious
;(Pagination as PaginationComponentType).Next = PaginationNext

export default Pagination as PaginationComponentType
