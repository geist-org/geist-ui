import React from 'react'
import { SearchResults } from 'lib/components/search/helper'
import { useTheme } from 'components'

export type SearchRightLabelProps = {
  data: SearchResults[number]
}

const SearchRightLabel: React.FC<SearchRightLabelProps> = ({ data }) => {
  const theme = useTheme()

  if (!data.group) return null
  return (
    <div className="label">
      {data.group}
      <style jsx>{`
        .label {
          position: absolute;
          right: 10px;
          bottom: 8px;
          font-size: 12px;
          color: ${theme.palette.accents_3};
          font-family: ${theme.font.prism};
          letter-spacing: 0.2px;
        }
      `}</style>
    </div>
  )
}

export default SearchRightLabel
