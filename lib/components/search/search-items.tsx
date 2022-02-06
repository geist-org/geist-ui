import React, {
  MouseEvent,
  useRef,
  useState,
  FocusEvent,
  useImperativeHandle,
  useMemo,
} from 'react'
import { groupResults, isSearchItem, SearchResults } from './helper'
import SearchItem from './search-item'
import { useTheme } from 'components'
import Highlight from 'components/shared/highlight'
import { useRect } from 'components/utils/layouts'

export type SearchItemsProps = {
  data: SearchResults
  onSelect: (url: string) => void
  preventHoverHighlightSync?: boolean
  displayHoverHighlight?: boolean
}

export type SearchItemsRef = HTMLUListElement & {
  closeHighlight: () => void
}

const SearchItems = React.forwardRef<
  SearchItemsRef,
  React.PropsWithChildren<SearchItemsProps>
>(
  (
    { data, onSelect, preventHoverHighlightSync },
    outRef: React.Ref<SearchItemsRef | null>,
  ) => {
    const theme = useTheme()
    const { rect, setRect } = useRect()
    const ref = useRef<HTMLUListElement | null>(null)
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

    const grouppedResults = useMemo(() => groupResults(data), [data])

    return (
      <ul className="results" role="listbox" ref={ref}>
        <Highlight
          className="results-hover"
          rect={rect}
          visible={displayHighlight}
          activeOpacity={0.5}
        />
        {grouppedResults.map((group) => (
          <li role="presentation" key={group.title}>
            <div className="group-title">{group.title}</div>
            <ul role="group">
              {group.items.map(item => (
                <SearchItem
                  onSelect={onSelect}
                  onMouseOver={hoverHandler}
                  onFocus={focusHandler}
                  onBlur={blurHandler}
                  data={item}
                  key={item.url}
                />
              ))}
            </ul>
          </li>
        ))}
        <style jsx>{`
          .results {
            width: 100%;
            max-height: 300px;
            overflow-y: auto;
            position: relative;
            scroll-behavior: smooth;
            margin-bottom: 0.5rem;
          }
          .results :global(li:before) {
            content: none;
          }
          .group-title {
            color: ${theme.palette.accents_5};
            font-size: 0.75rem;
            text-align: start;
            margin: 0.25rem 0;
          }
          .results:global(div.highlight.results-hover) {
            border-radius: 8px;
          }
        `}</style>
      </ul>
    )
  },
)

export default SearchItems
