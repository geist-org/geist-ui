export type AlgoliaAPIHit = {
  group: string
  name: string
  objectID: string
  url: string
}

export const flattenArray = <T>(contents: T[][] | unknown): T[] => {
  if (!Array.isArray(contents)) return contents as T[]
  return contents.reduce((pre, current) => {
    return pre.concat(
      Array.isArray(current) ? flattenArray(current as any as T[][]) : current,
    )
  }, [])
}

export const isSearchItem = (el?: HTMLElement): boolean => {
  if (!el) return false
  if (el?.dataset && el?.dataset['search-item']) return true
  el.attributes.getNamedItem('data-search-item')
  return !!el.attributes.getNamedItem('data-search-item')
}

export const FOCUS_ELEMENT_DATA_NAME = 'data-search-item'

export const focusNextElement = (
  containerElement: HTMLElement | null,
  done: () => void,
  isBack?: boolean,
) => {
  const focusTo = (child?: HTMLElement) => {
    if (child?.tagName !== 'BUTTON') return
    done()
    ;(child as HTMLButtonElement)?.focus()
  }

  if (!containerElement) return
  const children = Array.from(containerElement.querySelectorAll('button'))
  if (children.length === 0) return

  const indexStr = document.activeElement?.getAttribute(FOCUS_ELEMENT_DATA_NAME)
  const index = Number(indexStr)
  if (Number.isNaN(index) || indexStr === null) {
    if (isBack) return
    return focusTo(children[0])
  }

  if (isBack) {
    if (index - 1 < 0) return focusTo(children[children.length - 1])
    return focusTo(children[index - 1])
  }

  if (index + 2 > children.length) return focusTo(children[0])
  focusTo(children[index + 1])
}
