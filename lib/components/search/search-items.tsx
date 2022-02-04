import React, {
  MouseEvent,
  useRef,
  useState,
  FocusEvent,
  useImperativeHandle,
} from 'react'
import { AlgoliaAPIHit, isSearchItem } from './helper'
import SearchItem from './search-item'
import Highlight from 'components/shared/highlight'
import { useRect } from 'components/utils/layouts'

export type SearchItemsProps = {
  hits: Array<AlgoliaAPIHit>
  onSelect: (url: string) => void
  preventHoverHighlightSync?: boolean
  displayHoverHighlight?: boolean
}

export type SearchItemsRef = HTMLDivElement & {
  closeHighlight: () => void
}

const SearchItems = React.forwardRef<
  SearchItemsRef,
  React.PropsWithChildren<SearchItemsProps>
>(
  (
    { hits, onSelect, preventHoverHighlightSync },
    outRef: React.Ref<SearchItemsRef | null>,
  ) => {
    const { rect, setRect } = useRect()
    const ref = useRef<HTMLDivElement | null>(null)
    const [displayHighlight, setDisplayHighlight] = useState<boolean>(false)
    useImperativeHandle(outRef, () =>
      Object.assign(ref.current, {
        closeHighlight: () => setDisplayHighlight(false),
      }),
    )

    const hoverHandler = (event: MouseEvent<HTMLButtonElement>) => {
      if (preventHoverHighlightSync) return
      if (!isSearchItem(event.target as HTMLButtonElement)) return
      ;(event.target as HTMLButtonElement).focus()
    }
    const focusHandler = (event: FocusEvent<HTMLButtonElement>) => {
      if (!isSearchItem(event.target as HTMLButtonElement)) return
      setRect(event, () => ref.current)
      setDisplayHighlight(true)
    }
    const blurHandler = () => {
      setDisplayHighlight(false)
    }

    return (
      <div className="results" ref={ref}>
        <Highlight
          className="results-hover"
          rect={rect}
          visible={displayHighlight}
          activeOpacity={0.5}
        />
        {hits.map((hit, index) => (
          <SearchItem
            onSelect={onSelect}
            onMouseOver={hoverHandler}
            onFocus={focusHandler}
            onBlur={blurHandler}
            hit={hit}
            key={hit.url}
            index={index}
          />
        ))}
        <style jsx>{`
          .results {
            width: 100%;
            max-height: 300px;
            overflow-y: auto;
            position: relative;
            scroll-behavior: smooth;
          }
          .results:global(div.highlight.results-hover) {
            border-radius: 0;
          }
        `}</style>
      </div>
    )
  },
)

export default SearchItems
