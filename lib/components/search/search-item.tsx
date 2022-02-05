import React, { MouseEvent, FocusEvent } from 'react'
import { FOCUS_ELEMENT_DATA_NAME, SearchResults } from './helper'
import { Text, useTheme } from 'components'
import SearchIcon from './search-icon'
import SearchRightLabel from './search-right-label'

export type SearchItemProps = {
  data: SearchResults[number]
  index: number
  onMouseOver: (e: MouseEvent<HTMLButtonElement>) => void
  onSelect: (url: string) => void
  onFocus: (e: FocusEvent<HTMLButtonElement>) => void
  onBlur?: (e: FocusEvent<HTMLButtonElement>) => void
}

const SearchItem: React.FC<SearchItemProps> = ({
  data,
  index,
  onMouseOver,
  onSelect,
  onFocus,
  onBlur = () => {},
}) => {
  const theme = useTheme()
  const selectHandler = () => {
    onSelect(data.url)
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
      <SearchIcon data={data} />
      <Text pl="12px" font="14px" className="value">
        {data.name}
      </Text>
      <SearchRightLabel data={data} />
      <style jsx>{`
        .container {
          width: 100%;
          height: 55px;
          padding: 0 10px;
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
        .container:global(.value) {
          font-family: ${theme.font.prism};
          font-weight: 500;
        }
        .container:global(svg) {
          width: 16px;
          height: 16px;
        }
      `}</style>
    </button>
  )
}

export default SearchItem
