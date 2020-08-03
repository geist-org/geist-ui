import React, { useMemo } from 'react'
import withDefaults from '../utils/with-defaults'
import useTheme from '../styles/use-theme'
import { useAutoCompleteContext } from './auto-complete-context'
import { NormalSizes } from '../utils/prop-types'
import FuzzyMatch from '../shared/fuzzy-match'

interface Props {
  label: string
  isLabelOnly?: boolean
  solid?: boolean
}

const defaultProps = {
  solid: false,
}

export type AutoCompleteItemProps = Props & typeof defaultProps & React.HTMLAttributes<any>

const getSizes = (size: NormalSizes) => {
  const fontSizes: { [key in NormalSizes]: string } = {
    mini: '.7rem',
    small: '.75rem',
    medium: '.875rem',
    large: '1rem',
  }
  return fontSizes[size]
}

const AutoCompleteItem: React.FC<React.PropsWithChildren<AutoCompleteItemProps>> = ({
  solid,
  label,
  children,
  isLabelOnly,
}) => {
  const theme = useTheme()
  const { value, updateValue, size, updateVisible } = useAutoCompleteContext()
  const selectHandler = () => {
    updateValue && updateValue(label)
    updateVisible && updateVisible(false)
  }

  const fontSize = useMemo(() => getSizes(size), [size])

  // The 'isLabelOnly' is only used inside the component,
  // Automatically adjust width when only label children is included.
  const itemHeight = useMemo(() => {
    if (isLabelOnly) return `calc(1.688 * ${theme.layout.gap})`
    return 'auto'
  }, [isLabelOnly, theme.layout.gap])

  return (
    <div className="item" onClick={selectHandler}>
      {isLabelOnly ? (
        <FuzzyMatch
          color={solid ? 'secondary' : 'primary'}
          query={value || ''}
          label={label}
          height={`calc(1.688 * ${theme.layout.gap})`}
        />
      ) : (
        children
      )}
      <style jsx>{`
        .item {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          font-weight: normal;
          white-space: pre;
          font-size: ${fontSize};
          padding: 0 ${theme.layout.gapHalf};
          height: ${itemHeight};
          color: ${theme.palette.foreground};
          user-select: none;
          border: 0;
          cursor: pointer;
          transition: background 0.2s ease 0s, border-color 0.2s ease 0s;
        }

        .item:first-of-type {
          border-top-left-radius: ${theme.expressiveness.R2};
          border-top-right-radius: ${theme.expressiveness.R2};
        }

        .item:last-of-type {
          border-bottom-left-radius: ${theme.expressiveness.R2};
          border-bottom-right-radius: ${theme.expressiveness.R2};
        }

        .item:hover {
          background-color: ${theme.palette.cNeutral0};
        }

        .item.active {
          color: ${theme.palette.cTheme6};
        }
      `}</style>
    </div>
  )
}

export default withDefaults(AutoCompleteItem, defaultProps)
