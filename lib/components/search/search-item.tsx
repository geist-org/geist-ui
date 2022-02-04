import React, { MouseEvent, FocusEvent } from 'react'
import { AlgoliaAPIHit, FOCUS_ELEMENT_DATA_NAME } from './helper'
import { Text, useTheme } from 'components'
import SearchIcon from './search-icon'

export type SearchItemProps = {
  hit: AlgoliaAPIHit
  index: number
  onMouseOver: (e: MouseEvent<HTMLButtonElement>) => void
  onSelect: (url: string) => void
  onFocus: (e: FocusEvent<HTMLButtonElement>) => void
  onBlur?: (e: FocusEvent<HTMLButtonElement>) => void
}

const SearchItem: React.FC<SearchItemProps> = ({
  hit,
  index,
  onMouseOver,
  onSelect,
  onFocus,
  onBlur = () => {},
}) => {
  const theme = useTheme()
  const selectHandler = () => {
    onSelect(hit.url)
  }

  const dataAttr = {
    [FOCUS_ELEMENT_DATA_NAME]: index,
  }

  return (
    <button
      className="container"
      onClick={selectHandler}
      onMouseOver={onMouseOver}
      onFocus={onFocus}
      onBlur={onBlur}
      {...dataAttr}>
      <SearchIcon hit={hit} />
      <Text pl="5px">{hit.name}</Text>
      <style jsx>{`
        .container {
          width: 100%;
          height: 55px;
          padding: 0 20px;
          display: flex;
          align-items: center;
          cursor: pointer;
          position: relative;
          transition: color 200ms ease;
          outline: none;
          border: 0;
          background-color: transparent;
        }
        .container:focus {
          color: ${theme.palette.violet};
        }
        // .container:hover {
        //   color: ${theme.palette.violet};
        // }
        .container:global(svg) {
          width: 16px;
          height: 16px;
        }
      `}</style>
    </button>
  )
}

export default SearchItem
