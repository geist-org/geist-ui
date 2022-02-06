import React, { MouseEvent, FocusEvent } from 'react'
import { SearchResults } from './helper'
import { Text, useTheme } from 'components'
import SearchIcon from './search-icon'

export type SearchItemProps = {
  data: SearchResults[number]
  onMouseOver: (e: MouseEvent<HTMLButtonElement>) => void
  onSelect: (url: string) => void
  onFocus: (e: FocusEvent<HTMLButtonElement>) => void
  onBlur?: (e: FocusEvent<HTMLButtonElement>) => void
}

const SearchItem: React.FC<SearchItemProps> = ({
  data,
  onMouseOver,
  onSelect,
  onFocus,
  onBlur = () => {},
}) => {
  const theme = useTheme()
  const selectHandler = () => {
    onSelect(data.url)
  }

  return (
    <li role="option">
      <button
        className="container"
        onClick={selectHandler}
        onMouseOver={onMouseOver}
        onFocus={onFocus}
        onBlur={onBlur}
        data-search-item>
        <SearchIcon data={data} />
        <Text pl="12px" font="14px" className="value" span>
          {data.name}
        </Text>
        <style jsx>{`
          .container {
            width: 100%;
            height: 48px;
            padding: 0 1rem;
            display: flex;
            align-items: center;
            cursor: pointer;
            position: relative;
            transition: color 200ms ease;
            outline: none;
            border: 0;
            color: ${theme.palette.accents_4};
            background-color: transparent;
          }
          .container:focus {
            color: ${theme.palette.foreground};
          }
          .container:global(.value) {
          }
          .container:global(svg) {
            width: 16px;
            height: 16px;
          }
        `}</style>
      </button>
    </li>
  )
}

export default SearchItem
