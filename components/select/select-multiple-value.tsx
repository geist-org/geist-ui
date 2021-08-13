import React from 'react'
import useTheme from '../use-theme'
import Grid from '../grid'
import SelectClearIcon from './select-icon-clear'

interface Props {
  disabled: boolean
  onClear: (() => void) | null
}

const SelectMultipleValue: React.FC<React.PropsWithChildren<Props>> = ({
  disabled,
  onClear,
  children,
}) => {
  const theme = useTheme()

  return (
    <Grid>
      <div className="item">
        {children}
        {!!onClear && <SelectClearIcon onClick={onClear} />}
      </div>
      <style jsx>{`
        .item {
          display: inline-flex;
          justify-items: center;
          align-items: center;
          line-height: 1;
          padding: 0 0.5em;
          font-size: var(--select-font-size);
          height: calc(var(--select-font-size) * 2);
          border-radius: ${theme.layout.radius};
          background-color: ${theme.palette.accents_2};
          color: ${disabled ? theme.palette.accents_4 : theme.palette.accents_6};
        }

        .item > :global(div:not(.clear-icon)),
        .item > :global(div:not(.clear-icon):hover) {
          border-radius: 0;
          background-color: transparent;
          padding: 0;
          margin: 0;
          color: inherit;
        }
      `}</style>
    </Grid>
  )
}

SelectMultipleValue.displayName = 'GeistSelectMultipleValue'
export default SelectMultipleValue
