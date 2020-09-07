export const getPageCount = (total: number, pageSize: number) => {
  return Math.floor((total - 1) / pageSize) + 1
}
